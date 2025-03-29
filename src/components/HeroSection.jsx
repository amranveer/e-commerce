import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authstore';

const HeroSection = () => {
   const {user} = useAuthStore();
   const[name, setname] = useState('')
   
   useEffect(()=>{
      if(user){
        setname(user.name)
      } else{
        setname("username")
      }

   },[])

  return (
    <section 
      className="flex items-center justify-center bg-black text-white h-96 mb-8" 
      role="banner"
    >
      <h1 className="text-5xl font-bold text-center px-4">Hello Mr. {name} <br /> <br />Welcome to E-Cart</h1>
    </section>
  );
};

export default HeroSection;
