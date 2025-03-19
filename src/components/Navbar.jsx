import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { state: { cartItems } } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md  sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">E-Commerce Platform</h1>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-gray-200 transition-colors">Products</Link>
          
          <Link to="/cart" className="relative hover:text-gray-200 transition-colors">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-sm bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
