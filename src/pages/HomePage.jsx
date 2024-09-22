import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import ThreeBox from "../components/HomeComponent/ThreeBox";
import PosterSlider from "../components/HomeComponent/PosterSlider";

import { useNavigate } from "react-router-dom";
import Gallery from "../components/HomeComponent/Gallery";
import PlacedAlumni from "../components/HomeComponent/PlacedAlumni";

import AlumniStory from "../components/HomeComponent/Stories";

const HomePage = () => {
  const navigate = useNavigate();


  const authorizationToken = localStorage.getItem("token");
  
  if (!authorizationToken) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <PosterSlider />
      <ThreeBox />
   <AlumniStory/>
      <PlacedAlumni/>
   <Gallery/>
      <Footer />
    </>
  );
};

export default HomePage;
