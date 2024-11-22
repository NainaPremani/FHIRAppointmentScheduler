import React from "react";
import AppointmentList from "../components/AppointmentList";
import AppointmentForm from "../components/AppointmentForm";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Appointment Scheduler</h1>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default Home;
