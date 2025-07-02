import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white py-4 px-6 shadow-md sticky top-0 z-10"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="hover:scale-105 transition-transform duration-300">
          <h1 className="text-2xl font-bold">E-Cart</h1>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {["Home", "Products", "Cart", "Profile"].map((text) => (
            <Link
              key={text}
              to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
              className="relative group text-white text-lg font-medium"
            >
              {text}

              {/* Cart Badge */}
              {text === "Cart" && totalItems > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-4 text-xs bg-white text-black rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}

              {/* Underline Hover Animation */}
              <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Optional: Show logged-in user */}
          {isAuthenticated && user && (
            <span className="text-sm text-gray-300">
              Hello, <span className="font-semibold">{user.name}</span>
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
