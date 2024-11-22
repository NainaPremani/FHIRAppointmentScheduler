import React from "react";

interface AppointmentItemProps {
  appointment: {
    resource: {
      id: string;
      description: string;
      start: string;
      end: string;
    };
  };
  onDelete: (id: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onDelete,
}) => {
  const { id, description, start, end } = appointment.resource;

  return (
    <div>
      <p>{description}</p>
      <p>
        {new Date(start).toLocaleString()} - {new Date(end).toLocaleString()}
      </p>
      <button onClick={() => onDelete(id)}>Cancel</button>
    </div>
  );
};

export default AppointmentItem;
