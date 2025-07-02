import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: products, loading, error } = useSelector((state) => state.products);

  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Find product by _id (MongoDB)
  const product = products.find((prod) => prod._id === productId);

  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-red-600 text-xl mt-10">Product Not Found</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 mb-8 mt-10"
    >
      <button
        className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div
          className="w-full md:w-1/2 bg-gray-200 h-80 rounded"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-2xl font-semibold mb-4">
            ₹{product.price.toFixed(2)}
          </p>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
