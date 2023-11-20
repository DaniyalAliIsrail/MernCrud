import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, OTPCode, SignUp, Dashboard  } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import Vendor from "../pages/Vendor";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Dashboard />} />
        <Route path="vendor" element={<Vendor/>}/>
        {/* <Routes path="updateuser/:id" element={<UpdateUser/>}/> */}
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="OTPCode" element={<OTPCode />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
