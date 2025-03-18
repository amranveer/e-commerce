import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { state: { cartItems }, dispatch } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="text-center text-xl mt-10">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 mb-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center mb-4 p-4 bg-white rounded shadow">
          <div>
            <h2 className="font-semibold text-xl">{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6 text-2xl font-bold">
        Total: ₹{totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
