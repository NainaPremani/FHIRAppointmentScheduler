import React, { useState } from "react";
import { createAppointment } from "../../../services/api";

const AppointmentForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [doctorReference, setDoctorReference] = useState<string>("");
  const [patientReference, setPatientReference] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment({
        description,
        start,
        end,
        doctorReference,
        patientReference,
      });
      setDescription("");
      setStart("");
      setEnd("");
      setDoctorReference("");
      setPatientReference("");
      // Optionally: refresh appointments list
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule New Appointment</h2>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Doctor Reference:</label>
        <input
          type="text"
          value={doctorReference}
          onChange={(e) => setDoctorReference(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Patient Reference:</label>
        <input
          type="text"
          value={patientReference}
          onChange={(e) => setPatientReference(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Appointment</button>
    </form>
  );
};

export default AppointmentForm;
