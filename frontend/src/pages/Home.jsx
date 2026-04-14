import React from "react";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import Certification from '../components/Certification.jsx';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Certification />
    </div>
  );
};

export default Home;