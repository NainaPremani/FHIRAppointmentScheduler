/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { NavbarHeader } from "@/components/navbarHeader";

import React from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavbarHeader /> {children}
    </>
  );
};

export default Layout;
