import axios from "axios";
import { Appointment } from "../types/appointment";

const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your backend URL
});

export const fetchAppointments = () => api.get("/appointments");
export const createAppointment = (appointment: Appointment) =>
  api.post("/appointments", appointment);
export const deleteAppointment = (id: string) =>
  api.delete(`/appointments/${id}`);
