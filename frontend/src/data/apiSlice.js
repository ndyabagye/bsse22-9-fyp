import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({

    reducerPath: 'http://localhost:8000',

    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'}),

    endpoints: builder => ({

        getCars: builder.query({
            query: () => '/product/all'
        }),
        getCar: builder.query({
            query: id => `/product/${id}`
        }),
        getBrands: builder.query({
            query: () => '/product/all_brands',
        }),
        getBrand: builder.query({
            query: id => `product/brand_products/${id}`,
        })
    })
})

export const { useGetCarsQuery, useGetCarQuery, useGetBrandsQuery, useGetBrandQuery} = apiSlice;