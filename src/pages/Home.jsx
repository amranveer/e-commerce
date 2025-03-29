import React from 'react';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import {motion} from 'framer-motion'



const Home = () => {
  return (
    <motion.div
    initial={{ opacity: 0,  }}
    animate={{ opacity: 1,  }}
    transition={{ duration: 0.5 }} className="bg-white min-h-screen">
    <HeroSection/>
    <Categories/>
    <FeaturedProducts/>
    </motion.div>
  );
};

export default Home;
