import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtered and sorted products
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sorted = filtered.sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 mb-8 min-h-screen mt-4"
    >
      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select>

        <select className="p-2 border rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {paginated.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div
                className="bg-gray-200 h-40 mb-4 rounded"
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
              <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-black text-white rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
