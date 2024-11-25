// src/app/components/Loader.tsx
"use client";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
