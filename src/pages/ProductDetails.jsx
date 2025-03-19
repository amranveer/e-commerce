import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = products.find((prod) => prod.id === parseInt(productId));

  if (!product) {
    return <div className="text-center text-red-600 text-xl mt-10">Product Not Found</div>;
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8 mt-10">
      <button
        className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div 
          className="w-full md:w-1/2 bg-gray-200 h-80 rounded"
          style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }}
        />

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-2xl font-semibold mb-4">₹{product.price.toFixed(2)}</p>
          <button 
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
