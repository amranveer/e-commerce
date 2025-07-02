import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/slices/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("image", imageFile);

    dispatch(createProduct(form));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
