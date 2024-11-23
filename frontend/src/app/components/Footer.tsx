// src/app/components/Footer.tsx
"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 mt-4 bg-dark text-light">
      <p>
        &copy; 2024 SMART on FHIR Appointment Scheduler. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
