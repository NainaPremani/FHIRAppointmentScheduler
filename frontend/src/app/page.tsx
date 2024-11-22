import React from "react";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

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
