import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { removeFromCart } from "../redux/slices/cartSlice";

// ✅ Inline selector instead of separate file
const selectCartItems = (state) => state.cart.items;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [removingItem, setRemovingItem] = useState(null);

  const handleRemove = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      dispatch(removeFromCart(id));
      setRemovingItem(null);
    }, 200);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 mb-8 mt-10"
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between items-center mb-4 p-4 bg-white rounded shadow"
          >
            <div>
              <h2 className="font-semibold text-xl">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
              onClick={() => handleRemove(item._id)}
              disabled={removingItem === item._id}
            >
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {cartItems.length === 0 && (
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl mt-10"
          >
            Your cart is empty.
          </motion.div>
        )}
      </AnimatePresence>

      {cartItems.length > 0 && (
        <div className="text-right mt-6 text-2xl font-bold">
          Total: ₹{totalPrice.toFixed(2)}
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
