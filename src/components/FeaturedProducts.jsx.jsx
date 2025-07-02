import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4); // Or .filter(p => p.featured)

  const getCartItem = (productId) => {
    return cartItems.find((item) => item._id === productId);
  };

  return (
    <section className="max-w-full mx-auto px-4 mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <Link to="/products">
          <h4 className="text-sm text-blue-600">View All</h4>
        </Link>
      </div>

      {loading && <p>Loading featured products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => {
          const cartItem = getCartItem(product._id);
          return (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
              <Link to={`/products/${product._id}`}>
                <div
                  className="bg-gray-200 h-40 mb-4 rounded"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Link>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price.toFixed(2)}</p>

              {cartItem ? (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(product._id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(product._id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
