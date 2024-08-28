import React from "react";
import Banner from "../../components/HomeComponents/Banner";
import ReviewSection from "../../components/HomeComponents/ReviewSection";
import FeaturedService from "../../components/HomeComponents/FeaturedService";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedService />
      <ReviewSection />
    </div>
  );
};

export default Home;
