/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import fhirclient from "fhirclient";

import dynamic from "next/dynamic";

const AppointmentList = dynamic(() => import("@/components/appointmentList"), {
  ssr: false,
});

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== "undefined") {
        try {
          const client = await fhirclient.oauth2.ready();
          const user = await client.user.read();
          setUserDetails(user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  // Safely check for userDetails and name
  const userName =
    userDetails && "name" in userDetails
      ? userDetails.name[0].given.join(" ")
      : "Unknown User";

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4 red">Upcoming Appointments for {userName}</h1>
        <AppointmentList />
      </div>
    </div>
  );
};

export default Dashboard;
