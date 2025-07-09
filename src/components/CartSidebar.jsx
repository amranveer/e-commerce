import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  saveCartToBackend,
} from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handlers that sync with backend
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
    dispatch(saveCartToBackend());
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
    dispatch(saveCartToBackend());
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    dispatch(saveCartToBackend());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            ref={modalRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={onClose} className="text-2xl text-black">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item._id} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrease(item._id)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleIncrease(item._id)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div
                        className="text-sm text-right text-red-500 cursor-pointer mt-1 hover:underline"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-lg mb-2">Total: ₹{totalPrice.toFixed(2)}</p>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block bg-black text-white text-center py-2 rounded hover:bg-gray-800"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
