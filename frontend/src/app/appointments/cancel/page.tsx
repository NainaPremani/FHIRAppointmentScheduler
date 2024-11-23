// src/app/appointments/cancel/page.tsx

import { useState } from "react";
import Modal from "@/app/components/Modal";
import { appointments } from "../../../../utils/mockData";

const CancelAppointmentPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCancel = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    // Logic to cancel the appointment (e.g., API call)
    console.log(`Canceling appointment ${selectedAppointment.id}`);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Cancel Appointment</h1>
      <div className="row">
        {appointments?.map((appointment) => (
          <div key={appointment.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{appointment.doctor}</h5>
                <p className="card-text">
                  {appointment.date} at {appointment.time}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancel(appointment)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          title="Confirm Cancellation"
          message={`Are you sure you want to cancel the appointment with ${selectedAppointment?.doctor}?`}
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CancelAppointmentPage;
