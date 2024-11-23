// src/app/appointments/new/page.tsx

import { useState } from "react";

const ScheduleAppointmentPage = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    reason: "",
    doctor: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here we would call the backend API to save the appointment
  };

  return (
    <div className="container mt-5">
      <h1>Schedule Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Appointment Time</label>
          <input
            type="time"
            name="time"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Reason</label>
          <textarea
            name="reason"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Doctor</label>
          <select
            name="doctor"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="">Select a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. John">Dr. John</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ScheduleAppointmentPage;
