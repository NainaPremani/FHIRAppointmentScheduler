// src/app/pages/index.tsx
import React from "react";
import Navbar from "../components/Navbar";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import useAppointments from "../hooks/useAppointments";

const IndexPage = () => {
  const { appointments, loading, addAppointment, removeAppointment } =
    useAppointments();

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h1>Appointment Scheduler</h1>
        <AppointmentForm addAppointment={addAppointment} />
        {loading ? (
          <Loader />
        ) : (
          <AppointmentList
            appointments={appointments}
            removeAppointment={removeAppointment}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;
