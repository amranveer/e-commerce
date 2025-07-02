import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 mb-8 mt-10"
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <AnimatePresence>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white shadow rounded p-4"
            >
              {/* Image and Details */}
              <div className="flex items-center gap-4 w-full sm:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} each | Subtotal: ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 text-xl mt-20"
          >
            Your cart is empty.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total Price */}
      {cartItems.length > 0 && (
        <div className="text-right mt-8 text-2xl font-bold">
          Total: ₹{totalPrice.toFixed(2)}
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
