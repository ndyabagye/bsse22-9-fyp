import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  cars: [],
  singleCar:[],
  filteredCars: [],
  selectedCar: '',
  error: null,
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  return await axios
    .get("http://localhost:8000/product/all")
    .then((res) => res.data);
});

export const fetchSingleCar = createAsyncThunk('cars/fetchSingleCar', async (id) => {
  return await axios
  .get(`http://localhost:8000/product/${id}`)
  .then((res)=> res.data);
})

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filterByName: (state, action) => {
      const filteredCars = state?.cars?.filter((car) =>
        car.make.toLowerCase().includes(action.payload.toLowerCase())
      );
      console.log("filtered", filteredCars);
      return {
        ...state,
        filteredCars:
          action.payload.length > 0 ? filteredCars : [...state.cars],
      };
    },
    setSelectedCar: (state, action) => {
      return {
        ...state,
        selectedCar: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // fetch all cars
    builder.addCase(fetchCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message;
    });

    // fetch single car
    builder.addCase(fetchSingleCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCar.fulfilled, (state, action) => {
      state.loading = false;
      state.singleCar = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSingleCar.rejected, (state, action) => {
      state.loading = false;
      state.singleCar = [];
      state.error = action.error.message;
    });
  },
});

export const { filterByName, setSelectedCar } = carsSlice.actions;

export default carsSlice.reducer;
