const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const appointmentRoutes = require("./routes/appointments");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log the FHIR_SERVER_URL to ensure it's read correctly
console.log("FHIR_SERVER_URL:", process.env.FHIR_SERVER_URL);

app.use(cors());
app.use(express.json());

app.use("/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
