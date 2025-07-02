import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Optional: Only show first 4 or filter featured
  const featuredProducts = products.slice(0, 4); // or .filter(p => p.featured)

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
        {featuredProducts.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div
                className="bg-gray-200 h-40 mb-4 rounded"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
              <button
                className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
