import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { act } from "react";

const initialState = {
    products: [],
    message: '',
    error: '',
    loading: false
}


export const getAllProduct = createAsyncThunk('products',
    async ({ product }) => {
        const response = await api.get('/produts');
        return response.data;
    }
)


const cartSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '',
                    state.message = "Product Fetched Successfuly"
                state.products = action.payload;
            })
            .addCase(getAllProduct.pending, (state, action) => {
                state.loading = true;
                state.message = '';
                state.error = '';
                state.products = state.products;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.loading = false;
                state.message = "";
                state.error = "Failed to get Products";
                state.products = state.products;
            })
    }
})

