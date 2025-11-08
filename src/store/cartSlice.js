import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
    message: '',
    loading: false,
    error: null

}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCart(state, action) {
            state.cart = action.payload;
            state.error = state.error;
            state.loading = state.loading;
            state.message = state.message
        }
    }, extraReducers(builder) {

    }
})