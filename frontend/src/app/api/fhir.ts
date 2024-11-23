// src/app/api/fhir.ts
import axios from 'axios';
import { Appointment } from '../../types/appointment';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const fetchAppointments = async (accessToken: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const createAppointment = async (appointment: Appointment, accessToken: string): Promise<Appointment> => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, appointment, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: string, accessToken: string): Promise<any> => {
  try {
    const response = await axios.delete(`${API_URL}/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    throw error;
  }
};
