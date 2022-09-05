import {configureStore} from '@reduxjs/toolkit';
import brandsSlice from './brands/brandsSlice';
import carsSlice from './cars/carsSlice';
import chatSlice from './chat/chatSlice';

export const store =configureStore({
    reducer:{
        brands: brandsSlice,
        cars: carsSlice,
        chats: chatSlice,
    },
})