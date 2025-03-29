import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {motion} from 'framer-motion'
const Navbar = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.length 
  return (
    <motion.nav
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }} className="bg-black text-white py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="hover:scale-105 transition-transform duration-300"
        >
          <h1 className="text-2xl font-bold">E-Cart</h1>
        </Link>

        <div className="flex items-center gap-8">
          {["Home", "Products", "Cart", "Profile"].map((text, index) => (
            <Link
              key={index}
              to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
              className="relative group text-white text-lg font-medium"
            >
              {text}
              {text === "Cart" && totalItems > 0 && (
                <motion.span
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1,}}
                    transition={{ duration: 2 }} className="absolute -top-2 -right-4 text-xs bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </motion.span>
              )}
              <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
