// src/app/components/AppointmentList.tsx
"use client";
import React from "react";
import AppointmentItem from "./AppointmentItem";

interface AppointmentListProps {
  appointments: any[];
  removeAppointment: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  removeAppointment,
}) => {
  return (
    <div>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            removeAppointment={removeAppointment}
          />
        ))
      ) : (
        <p>No appointments scheduled yet.</p>
      )}
    </div>
  );
};

export default AppointmentList;
