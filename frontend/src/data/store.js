import {configureStore} from '@reduxjs/toolkit';
import brandsSlice from './brands/brandsSlice';
import carsSlice from './cars/carsSlice';

export const store =configureStore({
    reducer:{
        brands: brandsSlice,
        cars: carsSlice,
    },
})