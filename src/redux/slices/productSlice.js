import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Product created:", response.data.product);
      return response.data.product;
    } catch (err) {
      console.error("Error uploading product:", err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      console.log("Fetched products:", response.data.products);
      return response.data.products;
    } catch (err) {
      console.error("Error fetching products:", err);
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
