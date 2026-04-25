import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Service from "./pages/Service.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import DoctorHome from "./pages/DoctorHome.jsx";
import List from "./doctor/List.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />

        <Route path="/services" element={<Service />} />
        <Route path="/services/:id" element={<ServiceDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/doctor-admin/login" element={<Login />} />
        <Route path="/doctor-admin/:id" element={<DoctorHome />} />
        <Route path="/doctor-admin/:id/appointments" element={<List />} />
      </Routes>
    </div>
  );
};

export default App;
