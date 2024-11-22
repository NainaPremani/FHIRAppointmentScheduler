import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointmentItem from "./AppointmentItem";

interface Appointment {
  resource: {
    id: string;
    description: string;
    start: string;
    end: string;
  };
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/appointments");
      setAppointments(response.data.entry || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/appointments/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment.resource.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.resource.id}
          appointment={appointment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
