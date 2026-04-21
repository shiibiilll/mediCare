import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Service from "./pages/Service.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />

        <Route path="/services" element={<Service />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
      </Routes>
    </div>
  );
};

export default App;
