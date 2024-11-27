const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

const FHIR_SERVER_URL = process.env.FHIR_SERVER_URL;

// Fetch all appointments

// Fetch all appointments
router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers["authorization"].split(" ")[1];
    console.log("Access Token:", accessToken); // Debugging log
    console.log("FHIR_SERVER_URL:", FHIR_SERVER_URL); // Debugging log

    // Fetch all appointments
    const response = await axios.get(`${FHIR_SERVER_URL}/Appointment`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const appointments = response.data.entry || [];
    console.log("Fetched Appointments:", appointments); // Debugging log

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err.message });
  }
});

// Endpoint to fetch all available doctors
router.get("/available-doctors", async (req, res) => {
  const accessToken = req.headers["authorization"].split(" ")[1]; // Bearer token

  try {
    const response = await axios.get(`${FHIR_SERVER_URL}/Practitioner`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const practitioners = response.data.entry || [];

    // Extract unique doctor IDs and names
    const availableDoctors = practitioners.map((practitioner) => {
      return {
        id: practitioner.resource.id,
        name: practitioner.resource.name[0].text,
      };
    });

    if (availableDoctors.length === 0) {
      return res.status(404).json({ message: "No available doctors found" });
    }

    res.status(200).json(availableDoctors);
  } catch (err) {
    console.error("Error fetching available doctors:", err.message);
    res.status(500).json({
      message: "Error fetching available doctors",
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { reason, specialty, appointmentDate, patientID } = req.body;

  if (!specialty || !appointmentDate || !reason || !patientID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const accessToken = req.headers["authorization"].split(" ")[1]; // Bearer token

  try {
    const doctorResponse = await axios.get(`${FHIR_SERVER_URL}/Practitioner`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const practitioners = doctorResponse.data.entry || [];
    const availableDoctors = practitioners.map(
      (practitioner) => practitioner.resource.id
    );

    const assignedDoctorID =
      availableDoctors[Math.floor(Math.random() * availableDoctors.length)];

    const appointmentData = {
      resourceType: "Appointment",
      status: "booked", // Ensure appointment status is 'booked'
      description: reason,
      start: appointmentDate,
      participant: [
        {
          actor: { reference: `Practitioner/${assignedDoctorID}` },
          status: "accepted",
        },
        { actor: { reference: `Patient/${patientID}` }, status: "accepted" },
      ],
    };

    console.log("Appointment Data to POST:", appointmentData); // Debugging log

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

    console.log("FHIR Server Response:", response.data); // Debugging log

    const appointment = response.data;

    // Fetch doctor details
    const doctorDetailsResponse = await axios.get(
      `${FHIR_SERVER_URL}/Practitioner/${assignedDoctorID}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const doctorDetails = doctorDetailsResponse.data;

    // Construct response similar to GET response
    const responseData = {
      fullUrl: `${FHIR_SERVER_URL}/Appointment/${appointment.id}`,
      resource: {
        ...appointment,
        identifier: [
          {
            type: { text: "AMR" },
            value: "34423-23432-13",
          },
        ],
        serviceType: [
          { text: "Consultas Médicas | Medicina Geral e Familiar" },
          { text: "Consultas Médicas | Urologia" },
        ],
        created: new Date().toISOString(), // Include the created field
        comment: "Cra", // Example comment
        doctorDetails,
      },
      search: {
        mode: "match",
      },
      response: {
        status: "201 Created",
        etag: `W/"${appointment.meta.versionId}"`,
      },
    };

    res.status(201).json(responseData);
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res
      .status(500)
      .json({ message: "Error creating appointment", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const appointmentId = req.params.id;

  if (!appointmentId) {
    return res.status(400).json({ message: "Appointment ID is required" });
  }

  try {
    const accessToken = req.headers["authorization"].split(" ")[1]; // Bearer token
    const response = await axios.get(
      `${FHIR_SERVER_URL}/Appointment/${appointmentId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const updatedAppointment = { ...response.data, status: "cancelled" };

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
    console.error("Error canceling appointment:", err.message);
    res
      .status(500)
      .json({ message: "Error canceling appointment", error: err.message });
  }
});

module.exports = router;
