module.exports.validateAppointment = (req, res, next) => {
  const { patientReference, doctorReference, appointmentDate, reason } =
    req.body;

  if (!patientReference || !doctorReference || !appointmentDate || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
};
