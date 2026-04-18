import React from "react";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import Certification from '../components/Certification.jsx';
import HomeDoctors from "../components/HomeDoctors.jsx";
import Testimonial from "../components/testimonial.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Certification />
      <HomeDoctors />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;