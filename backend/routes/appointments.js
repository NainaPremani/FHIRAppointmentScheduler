const express = require("express");
const axios = require("axios");
const { getAccessToken, refreshAccessToken } = require("../utils/tokenManager");
const router = express.Router();

const FHIR_SERVER_URL = process.env.FHIR_SERVER_URL;

// Fetch appointments
router.get("/", async (req, res) => {
  try {
    let accessToken = getAccessToken();

    // If the token is expired, refresh it
    try {
      const response = await axios.get(`${FHIR_SERVER_URL}/Appointment`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      res.status(200).json(response.data);
    } catch (err) {
      // If there's an error with token expiration
      if (err.response && err.response.status === 401) {
        console.log("Token expired. Refreshing...");
        accessToken = await refreshAccessToken(); // Refresh token if expired
        const response = await axios.get(`${FHIR_SERVER_URL}/Appointment`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        res.status(200).json(response.data); // Send data after token refresh
      } else {
        console.error("Error fetching appointments:", err.message);
        res.status(500).json({ message: "Error fetching appointments" });
      }
    }
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Create a new appointment

router.post("/", async (req, res) => {
  const { patientReference, doctorReference, appointmentDate, reason } =
    req.body;

  // Validate required fields
  if (!patientReference || !doctorReference || !appointmentDate || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const appointmentData = {
    resourceType: "Appointment",
    status: "booked",
    description: reason,
    start: appointmentDate,
    participant: [
      { actor: { reference: doctorReference }, status: "accepted" },
      { actor: { reference: patientReference }, status: "accepted" },
    ],
  };

  try {
    const accessToken = getAccessToken();

    // Make the POST request to SMART FHIR server
    const response = await axios.post(
      `${FHIR_SERVER_URL}/Appointment`,
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json(response.data); // Return the created appointment data
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    // Log the full error to the console for debugging
    if (err.response) {
      console.error("Error details:", err.response.data);
      return res.status(500).json({
        message: "Error creating appointment",
        error: err.response.data,
      });
    } else {
      console.error("Error without response:", err.message);
      return res
        .status(500)
        .json({ message: "Error creating appointment", error: err.message });
    }
  }
});

// Cancel an appointment
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ message: "Appointment ID is required" });
//   }

//   try {
//     let accessToken = getAccessToken();

//     // If the token is expired, refresh it
//     try {
//       const response = await axios.get(`${FHIR_SERVER_URL}/Appointment/${id}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       const updatedAppointment = { ...response.data, status: "cancelled" };
//       await axios.put(
//         `${FHIR_SERVER_URL}/Appointment/${id}`,
//         updatedAppointment,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       res.status(200).json({ message: "Appointment cancelled successfully" });
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         console.log("Token expired. Refreshing...");
//         accessToken = await refreshAccessToken(); // Refresh token if expired
//         const response = await axios.get(
//           `${FHIR_SERVER_URL}/Appointment/${id}`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         const updatedAppointment = { ...response.data, status: "cancelled" };
//         await axios.put(
//           `${FHIR_SERVER_URL}/Appointment/${id}`,
//           updatedAppointment,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         res.status(200).json({ message: "Appointment cancelled successfully" });
//       } else {
//         console.error("Error cancelling appointment:", err.message);
//         res.status(500).json({ message: "Error cancelling appointment" });
//       }
//     }
//   } catch (err) {
//     console.error("Error cancelling appointment:", err.message);
//     res.status(500).json({ message: "Error cancelling appointment" });
//   }
// });
// Route to cancel an appointment
router.delete("/:id", async (req, res) => {
  const appointmentId = req.params.id; // Get the appointment ID from the URL

  if (!appointmentId) {
    return res.status(400).json({ message: "Appointment ID is required" });
  }

  try {
    const accessToken = getAccessToken(); // Fetch the access token

    // Fetch the current appointment to modify it
    const response = await axios.get(
      `${FHIR_SERVER_URL}/Appointment/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Update the status to "cancelled"
    const updatedAppointment = {
      ...response.data,
      status: "cancelled", // Changing the appointment status to cancelled
    };

    // Send the update to the FHIR server
    await axios.put(
      `${FHIR_SERVER_URL}/Appointment/${appointmentId}`,
      updatedAppointment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling appointment:", err.message);
    res
      .status(500)
      .json({ message: "Error cancelling appointment", error: err.message });
  }
});

module.exports = router;
