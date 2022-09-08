import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  brands: [],
  brandProducts: [],
  error: null,
  filteredBrands:[],
};

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  return await axios
    .get(
      "http://localhost:8000/product/all_brands"
    )
    .then((res) => res.data);
});

export const fetchBrandProducts = createAsyncThunk("brands/fetchBrandProducts", async (id) => {
  return await axios
    .get(
      `http://localhost:8000/product/brand_products/${id}`
    )
    .then((res) => res.data);
});

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //get all brands
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.error = action.error.message;
    });

    // get all products under a brand
    builder.addCase(fetchBrandProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.brandProducts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBrandProducts.rejected, (state, action) => {
      state.loading = false;
      state.brandProducts = [];
      state.error = action.error.message;
    });
  },
});

// export const { filterByName} = brandsSlice.actions;

export default brandsSlice.reducer;
