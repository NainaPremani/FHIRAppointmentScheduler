const axios = require("axios");
require("dotenv").config();

const FHIR_SERVER_URL = process.env.FHIR_SERVER_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const getAppointmentsFromFHIR = async () => {
  try {
    const response = await axios.get(`${FHIR_SERVER_URL}/Appointment`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments from FHIR:", error);
    throw new Error(error);
  }
};

module.exports = { getAppointmentsFromFHIR };
