import React, { useState } from 'react';
import products from '../data/products';
import { Link } from 'react-router-dom'

const Products = () => {
    
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort Products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mb-8 min-h-screen mt-4">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Category Filter */}
        <select 
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select>

        {/* Sorting */}
        <select 
          className="p-2 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        {/* Search */}
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {paginatedProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} >

          <div 
            
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div 
              className="bg-gray-200 h-40 mb-4 rounded"
              style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }}
            ></div>
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

      {/* Pagination */}
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
    </div>
  );
};

export default Products;
