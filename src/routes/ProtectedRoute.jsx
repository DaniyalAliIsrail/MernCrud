import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dashboard } from "../pages";

const ProtectedRoute = () => {
  return localStorage.getItem("usertoken") ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
