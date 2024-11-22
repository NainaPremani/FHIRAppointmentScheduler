const axios = require("axios");
require("dotenv").config();

let ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FHIR_SERVER_URL = process.env.FHIR_SERVER_URL;

// Function to get the current access token
const getAccessToken = () => {
  if (!ACCESS_TOKEN) {
    throw new Error("Access token is not available.");
  }
  return ACCESS_TOKEN;
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async () => {
  try {
    // Request new access token using the refresh token
    const response = await axios.post(`${FHIR_SERVER_URL}/token`, {
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });

    // Update the access token
    ACCESS_TOKEN = response.data.access_token;
    console.log("Access token refreshed:", ACCESS_TOKEN);
    return ACCESS_TOKEN; // Return the new access token
  } catch (error) {
    throw new Error("Failed to refresh access token: " + error.message);
  }
};

// You can add a helper function to check the token expiry (if needed)

module.exports = { getAccessToken, refreshAccessToken };
