// src/app/components/AppointmentForm.tsx
"use client";
import React, { useState } from "react";

const AppointmentForm: React.FC<{
  addAppointment: (appointment: any) => void;
}> = ({ addAppointment }) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      id: Math.random().toString(),
      patientName,
      doctorName,
      appointmentDate,
      reason,
    });
    setPatientName("");
    setDoctorName("");
    setAppointmentDate("");
    setReason("");
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title">Schedule an Appointment</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor Name</label>
          <input
            type="text"
            className="form-control"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="datetime-local"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
