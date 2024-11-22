const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  participant: [
    {
      actor: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
      status: { type: String },
    },
  ],
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
