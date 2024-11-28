/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = "https://fhirappointmentscheduler.onrender.com";
const APPOINTMENTS_URL = `${API_URL}/appointments/`;

// Function to fetch appointments
export const fetchAppointments = async () => {
  const tokenResponseStringone = sessionStorage.getItem("SMART_KEY");
  if (!tokenResponseStringone) {
    throw new Error("SMART_KEY not found in session storage");
  }
  const dummy = JSON.parse(tokenResponseStringone);
  const tokenResponseString = sessionStorage.getItem(dummy);

  if (!tokenResponseString) {
    throw new Error("Access token not found");
  }
  const tokenResponse = JSON.parse(tokenResponseString);
  const accessToken = tokenResponse?.tokenResponse?.access_token;
  console.log(accessToken,"access token")

  try {
    const response = await axios.get(APPOINTMENTS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching appointments"
    );
  }
};

// Function to delete an appointment
export const deleteAppointment = async (appointmentId: string) => {
  const tokenResponseStringone = sessionStorage.getItem("SMART_KEY");
  if (!tokenResponseStringone) {
    throw new Error("SMART_KEY not found in session storage");
  }
  const dummy = JSON.parse(tokenResponseStringone);
  const tokenResponseString = sessionStorage.getItem(dummy);

  if (!tokenResponseString) {
    throw new Error("Access token not found");
  }
  const tokenResponse = JSON.parse(tokenResponseString);
  const accessToken = tokenResponse?.tokenResponse?.access_token;

  try {
    const response = await axios.delete(`${APPOINTMENTS_URL}/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting appointment:", error);
    throw new Error(
      error.response?.data?.message || "Error deleting appointment"
    );
  }
};

// Function to fetch unique doctor IDs
export const fetchDoctorIds = async () => {
  const tokenResponseStringone = sessionStorage.getItem("SMART_KEY");
  if (!tokenResponseStringone) {
    throw new Error("SMART_KEY not found in session storage");
  }
  const dummy = JSON.parse(tokenResponseStringone);
  const tokenResponseString = sessionStorage.getItem(dummy);

  if (!tokenResponseString) {
    throw new Error("Access token not found");
  }
  const tokenResponse = JSON.parse(tokenResponseString);
  const accessToken = tokenResponse?.tokenResponse?.access_token;
  console.log(accessToken,"accessToken")

  try {
    const response = await axios.get(`${APPOINTMENTS_URL}/available-doctors`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching doctor IDs:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching doctor IDs"
    );
  }
};

// Function to create an appointment
export const createAppointment = async (appointmentData: any) => {
  const tokenResponseStringone = sessionStorage.getItem("SMART_KEY");
  if (!tokenResponseStringone) {
    throw new Error("SMART_KEY not found in session storage");
  }
  const dummy = JSON.parse(tokenResponseStringone);
  const tokenResponseString = sessionStorage.getItem(dummy);

  if (!tokenResponseString) {
    throw new Error("Access token not found");
  }
  const tokenResponse = JSON.parse(tokenResponseString);
  const accessToken = tokenResponse?.tokenResponse?.access_token;

  try {
    const response = await axios.post(APPOINTMENTS_URL, appointmentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    throw new Error(
      error.response?.data?.message || "Error creating appointment"
    );
  }
};
