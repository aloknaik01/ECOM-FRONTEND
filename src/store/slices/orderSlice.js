import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../../utils/api';
import toast from 'react-hot-toast';

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMy',
  async (_, { rejectWithValue }) => {
    try { return await orderAPI.getMyOrders(); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderAPI.place(orderData);
      toast.success('Order placed! Proceed to payment.');
      return data;
    }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    myOrders: [],
    loading: false,
    // payment
    paymentIntent: null,   // client_secret from stripe
    placingOrder: false,
    error: null,
  },
  reducers: {
    clearPaymentIntent: (state) => { state.paymentIntent = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending,   (s) => { s.loading = true; })
      .addCase(fetchMyOrders.fulfilled, (s, a) => { s.loading = false; s.myOrders = a.payload.myOrders; })
      .addCase(fetchMyOrders.rejected,  (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(placeOrder.pending,   (s) => { s.placingOrder = true; })
      .addCase(placeOrder.fulfilled, (s, a) => {
        s.placingOrder = false;
        s.paymentIntent = a.payload.paymentIntent; // stripe client_secret
      })
      .addCase(placeOrder.rejected,  (s, a) => { s.placingOrder = false; s.error = a.payload; });
  },
});

export const { clearPaymentIntent } = orderSlice.actions;
export default orderSlice.reducer;