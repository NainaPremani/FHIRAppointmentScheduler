// src/app/page.tsx
import React from "react";
import { Inter } from "next/font/google"; // If you're using Google fonts
import "../../styles/globals.css"; // Global styles (if you have any)

const inter = Inter({ subsets: ["latin"] });

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SMART on FHIR Appointment Scheduler</title>
      </head>
      <body className={inter.className}>
        <div className="app-container">
          {children} {/* Render child components */}
        </div>
      </body>
    </html>
  );
};

export default Page;
