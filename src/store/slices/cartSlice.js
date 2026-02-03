import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],          // [{ product: {...}, quantity: number }]
    couponDiscount: 0,  // dollar amount off
  },
  reducers: {
    addToCart: (state, { payload }) => {
      // payload = { product, quantity? }
      const qty = payload.quantity || 1;
      const idx = state.items.findIndex((i) => i.product.id === payload.product.id);
      if (idx >= 0) {
        state.items[idx].quantity += qty;
      } else {
        state.items.push({ product: payload.product, quantity: qty });
      }
    },

    removeFromCart: (state, { payload: productId }) => {
      state.items = state.items.filter((i) => i.product.id !== productId);
    },

    updateQuantity: (state, { payload: { productId, quantity } }) => {
      const idx = state.items.findIndex((i) => i.product.id === productId);
      if (idx >= 0) {
        if (quantity <= 0) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.couponDiscount = 0;
    },

    applyCoupon: (state, { payload: discount }) => {
      state.couponDiscount = discount;
    },

    removeCoupon: (state) => {
      state.couponDiscount = 0;
    },
  },
});

// ── selectors ─────────────────────────────────────────────
export const selectCartItems      = (state) => state.cart.items;
export const selectCartCount      = (state) => state.cart.items.reduce((s, i) => s + i.quantity, 0);
export const selectCartSubtotal   = (state) => state.cart.items.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
export const selectCouponDiscount = (state) => state.cart.couponDiscount;

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;