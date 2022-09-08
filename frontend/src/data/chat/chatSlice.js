import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  client_response: "",
  old_price_list: 0,
  offer_list: 0,
  base_price: 70000,
  selling_price: 100000,
  ai_response: "",
  messageList: [],
  newMessagesCount: 0,
  isOpen: false,
  fileUpload: true,
};

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

export const chatSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
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
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { incrementMessagesCount, openChat, addMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
