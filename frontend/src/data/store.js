import {configureStore} from '@reduxjs/toolkit';
import brandsSlice from './brands/brandsSlice';
import carsSlice from './cars/carsSlice';
import { apiSlice } from './apiSlice';

export const store =configureStore({
    reducer:{
        brands: brandsSlice,
        cars: carsSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})