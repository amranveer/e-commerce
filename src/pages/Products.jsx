import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  saveCartToBackend,
} from '../redux/slices/cartSlice';

const CustomDropdown = ({ label, value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 text-sm rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-black focus:border-black relative"
      >
        <span>{value}</span>
        <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">▾</span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option === value ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'All';
    const sortParam = searchParams.get('sort') || '';
    const searchParam = searchParams.get('search') || '';
    setCategory(categoryParam);
    setSortOrder(sortParam);
    setSearchQuery(searchParam);
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (category !== 'All') params.category = category;
    if (sortOrder) params.sort = sortOrder;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  }, [category, sortOrder, searchQuery]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(saveCartToBackend());
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
    dispatch(saveCartToBackend());
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
    dispatch(saveCartToBackend());
  };

  const filtered = products.filter((product) => {
    const matchCategory = category === 'All' || product.category === category;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sorted = filtered.sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getCartItem = (id) => cartItems.find((item) => item._id === id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 mb-8 min-h-screen mt-4"
    >
      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">
        <CustomDropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={['All', 'Electronics', 'Fashion', 'Home & Kitchen']}
        />

        <CustomDropdown
          label="Sort By"
          value={sortOrder || 'None'}
          onChange={(val) => setSortOrder(val === 'None' ? '' : val)}
          options={['None', 'lowToHigh', 'highToLow']}
        />

        <div className="flex flex-col">
          <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-gray-300 text-sm rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {paginated.map((product) => {
          const cartItem = getCartItem(product._id);

          return (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
              <Link to={`/products/${product._id}`}>
                <div
                  className="bg-gray-200 h-40 mb-4 rounded"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
              </Link>

              {cartItem ? (
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleDecrease(product._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => handleIncrease(product._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
