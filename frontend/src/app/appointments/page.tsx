// src/app/appointments/page.tsx

import AppointmentCard from "@/app/components/AppointmentCard";
import { appointments } from "../../../utils/mockData";

const AppointmentsPage = () => {
  return (
    <div className="container mt-5">
      <h1>Upcoming Appointments</h1>
      <div className="row">
        {appointments?.map((appointment) => (
          <div key={appointment.id} className="col-md-4 mb-4">
            <AppointmentCard {...appointment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
