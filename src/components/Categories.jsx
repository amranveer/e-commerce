import React from 'react';

const categories = ["Electronics", "Fashion", "Home & Kitchen"];

const Categories = () => {
  return (
    <section className="max-w-full mx-auto px-4 mb-8">
      <h2 className="text-3xl font-bold mb-6">Shop by Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category} 
            className="bg-gray-100 p-8 rounded-xl text-center shadow hover:shadow-lg transition-shadow cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Browse ${category} category`}
          >
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
