import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  brands: [],
  error: null,
  filteredBrands:[],
};

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  return await axios
    .get(
      "https://private-anon-ddcbf94e5c-carsapi1.apiary-mock.com/manufacturers"
    )
    .then((res) => res.data);
});

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
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
  },
});

// export const { filterByName} = brandsSlice.actions;

export default brandsSlice.reducer;
