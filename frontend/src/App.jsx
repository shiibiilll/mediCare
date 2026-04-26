import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Service from "./pages/Service.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import DoctorHome from "./pages/DoctorHome.jsx";
import List from "./doctor/List.jsx";
import EditProfile from "./doctor/EditProfile.jsx";
import Appointments from "./pages/Appointments.jsx";
import { CircleChevronUp } from "lucide-react";
import VerifyPaymentPage from "../VerifyPaymentPage.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};

// Scroll Button
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed right-4 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center 
      bg-emerald-600 text-white shadow-lg transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      hover:scale-110 hover:shadow-xl`}
      title="Go to top"
    >
      <CircleChevronUp size={22} />
    </button>
  );
};

const App = () => {
  // Lock the horizontal overflow
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
  return (
    <>
      <ScrollToTop />

      <div className="overflow-x-hidden bg-white text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />

          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetails />} />

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/contact" element={<Contact />} />

          {/* DOCTORS */}
          <Route path="/doctor-admin/login" element={<Login />} />
          <Route path="/doctor-admin/:id" element={<DoctorHome />} />
          <Route path="/doctor-admin/:id/appointments" element={<List />} />
          <Route
            path="/doctor-admin/:id/profile/edit"
            element={<EditProfile />}
          />

          {/* PAYMENT VERIFICATIONS */}
          <Route path="/appointment/success" element={<VerifyPaymentPage />} />
          <Route path="/appointment/cancel" element={<VerifyPaymentPage />} />

        </Routes>
      </div>

      <ScrollButton />
    </>
  );
};

export default App;
