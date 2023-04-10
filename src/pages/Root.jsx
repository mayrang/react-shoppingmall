import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
export default function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
