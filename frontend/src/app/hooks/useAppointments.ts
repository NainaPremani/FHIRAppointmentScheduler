// src/app/hooks/useAppointments.ts
'use client';
import { useState } from 'react';

const useAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([
    {
      id: '1',
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      appointmentDate: '2024-12-01T10:00',
      reason: 'Routine checkup',
    },
    {
      id: '2',
      patientName: 'Jane Doe',
      doctorName: 'Dr. Lee',
      appointmentDate: '2024-12-05T14:00',
      reason: 'Consultation',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const addAppointment = (appointment: any) => {
    setAppointments([...appointments, appointment]);
  };

  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return { appointments, loading, addAppointment, removeAppointment };
};

export default useAppointments;
