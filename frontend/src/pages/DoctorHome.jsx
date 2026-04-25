import React from "react";
import DoctorNavbar from "../doctor/DoctorNavbar.jsx";
import DashboardPage from "../doctor/DashboardPage.jsx";

const DoctorHome = () => {
  return (
    <div>
      <DoctorNavbar />
      <DashboardPage />
    </div>
  );
};

export default DoctorHome;
