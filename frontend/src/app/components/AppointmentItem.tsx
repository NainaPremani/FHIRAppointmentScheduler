// src/app/components/AppointmentItem.tsx
"use client";
import React from "react";

interface AppointmentItemProps {
  appointment: any;
  removeAppointment: (id: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  removeAppointment,
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{appointment.patientName}</h5>
        <p className="card-text">
          <strong>Doctor:</strong> {appointment.doctorName}
          <br />
          <strong>Appointment Date:</strong>{" "}
          {new Date(appointment.appointmentDate).toLocaleString()}
          <br />
          <strong>Reason:</strong> {appointment.reason}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => removeAppointment(appointment.id)}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentItem;
