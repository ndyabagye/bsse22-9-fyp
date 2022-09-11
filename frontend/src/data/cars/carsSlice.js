import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  cars: [],
  singleCar: [],
  filteredCars: [],
  selectedCar: "",
  error: null,

  //chat slice data
  client_response: "",
  old_price_list: 0,
  offer_list: 0,
  base_price: null,
  selling_price: null,
  // base_price: 70000,
  // selling_price: 100000,
  ai_response: "",
  messageList: [],
  newMessagesCount: 0,
  isOpen: false,
  fileUpload: true,
  checkout: false,
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  return await axios
    .get("http://localhost:8000/product/all")
    .then((res) => res.data);
});

export const fetchSingleCar = createAsyncThunk(
  "cars/fetchSingleCar",
  async (id) => {
    return await axios
      .get(`http://localhost:8000/product/${id}`)
      .then((res) => res.data);
  }
);

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (formData) => {
    console.log("Formdata", ...formData);
    return await axios
      .post("http://localhost:8000/product/sendChat", formData)
      .then((res) => res.data);
  }
);

const currentUser = "me";

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
    // chat reducers
    incrementMessagesCount(state) {
      state.newMessagesCount++;
    },
    openChat(state) {
      state.isOpen = !state.isOpen;
      state.newMessagesCount = 0;
    },
    addMessage(state, message) {
      console.log("Message is", message.payload);
      state.messageList = [...state.messageList, message.payload];
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
      console.log("error", action);
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
      state.base_price = action.payload[0].base_price;
      state.selling_price = action.payload[0].selling_price;
      state.error = "";
    });
    builder.addCase(fetchSingleCar.rejected, (state, action) => {
      console.log("error", action);
      state.loading = false;
      state.singleCar = [];
      state.error = action.error.message;
    });

    // chats builders
    builder.addCase(fetchChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.loading = false;
      //   state.ai_response = action.payload.ai_response;
      state.offer_list = action.payload.offer_list;
      state.old_price_list = action.payload.old_price_List;
      state.selling_price = action.payload.selling_price;
      state.base_price = action.payload.base_price;
      state.error = "";
      state.newMessagesCount++;
      state.messageList = [
        ...state.messageList,
        {
          author: "them",
          data: { text: action.payload.ai_response },
          type: "text",
        },
      ];
      if (action.payload.ai_response === "Ok we will have a deal") {
        state.checkout = true;
      }
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  filterByName,
  setSelectedCar,
  incrementMessagesCount,
  openChat,
  addMessage,
} = carsSlice.actions;

export default carsSlice.reducer;
