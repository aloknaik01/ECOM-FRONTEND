import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromStorage(), // Array of cart items
  totalQuantity: 0,
  totalPrice: 0,
  message: '',
  loading: false,
  error: null
};

// Calculate totals helper function
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item.id === newItem.id && 
                item.selectedSize === newItem.selectedSize && 
                item.selectedColor === newItem.selectedColor
      );

      if (existingItem) {
        // Item exists, increase quantity
        existingItem.quantity += newItem.quantity || 1;
        state.message = `Increased quantity of ${newItem.title}`;
      } else {
        // New item, add to cart
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          selectedSize: newItem.selectedSize || 'M',
          selectedColor: newItem.selectedColor || 'default',
          quantity: newItem.quantity || 1,
          category: newItem.category || 'Uncategorized'
        });
        state.message = `${newItem.title} added to cart`;
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
      state.error = null;
    },

    // Remove item from cart
    removeFromCart(state, action) {
      const { id, selectedSize, selectedColor } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        state.items.splice(itemIndex, 1);
        state.message = `${removedItem.title} removed from cart`;

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    // Update item quantity
    updateQuantity(state, action) {
      const { id, selectedSize, selectedColor, quantity } = action.payload;
      const item = state.items.find(
        item => item.id === id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          const itemIndex = state.items.findIndex(
            item => item.id === id && 
                    item.selectedSize === selectedSize && 
                    item.selectedColor === selectedColor
          );
          state.items.splice(itemIndex, 1);
          state.message = `${item.title} removed from cart`;
        } else {
          item.quantity = quantity;
          state.message = `Updated ${item.title} quantity`;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    // Increase quantity by 1
    incrementQuantity(state, action) {
      const { id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(
        item => item.id === id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (item) {
        item.quantity += 1;
        
        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    // Decrease quantity by 1
    decrementQuantity(state, action) {
      const { id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(
        item => item.id === id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          const itemIndex = state.items.findIndex(
            item => item.id === id && 
                    item.selectedSize === selectedSize && 
                    item.selectedColor === selectedColor
          );
          state.items.splice(itemIndex, 1);
          state.message = `${item.title} removed from cart`;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    // Clear entire cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.message = 'Cart cleared';
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('cart');
    },

    // Clear message
    clearMessage(state) {
      state.message = '';
    },

    // Set error
    setError(state, action) {
      state.error = action.payload;
      state.message = '';
    },

    // Initialize cart totals (useful after page reload)
    initializeCart(state) {
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  clearMessage,
  setError,
  initializeCart
} = cartSlice.actions;

export default cartSlice.reducer;