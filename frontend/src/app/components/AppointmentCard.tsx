// src/app/components/AppointmentCard.tsx
"use client";

type AppointmentCardProps = {
  date: string;
  time: string;
  doctor: string;
  reason: string;
  location: string;
  status: string;
};

const AppointmentCard = ({
  date,
  time,
  doctor,
  reason,
  location,
  status,
}: AppointmentCardProps) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{doctor}</h5>
        <p className="card-text">
          <strong>Date:</strong> {date} <br />
          <strong>Time:</strong> {time} <br />
          <strong>Location:</strong> {location} <br />
          <strong>Status:</strong> {status}
        </p>
        <button className="btn btn-primary">View Details</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
