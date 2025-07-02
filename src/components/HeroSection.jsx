import React from 'react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const user = useSelector((state) => state.auth.user); // from Redux store
  const name = user?.name || "username";

  return (
    <section 
      className="flex items-center justify-center bg-black text-white h-96 mb-8" 
      role="banner"
    >
      <h1 className="text-5xl font-bold text-center px-4">
        Hello Mr. {name} <br /> <br />Welcome to E-Cart
      </h1>
    </section>
  );
};

export default HeroSection;
