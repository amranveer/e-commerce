import React from 'react';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts.jsx';


const Home = () => {
  return (
    <div className="bg-white min-h-screen">
    <HeroSection/>
    <Categories/>
    <FeaturedProducts/>
    </div>
  );
};

export default Home;
