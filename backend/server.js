const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const appointmentRoutes = require("./routes/appointments");
const { refreshAccessToken } = require("./utils/tokenManager");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Refresh the access token automatically every 50 minutes (to avoid expiry)
setInterval(async () => {
  try {
    await refreshAccessToken(); // Refresh token periodically
    console.log("Access token refreshed automatically.");
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
  }
}, 50 * 60 * 1000); // 50 minutes in milliseconds

// Routes
app.use("/appointments", appointmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
