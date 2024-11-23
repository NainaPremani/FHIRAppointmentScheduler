// src/app/components/Navbar.tsx
"use client";
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          SMART on FHIR Appointment Scheduler
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
