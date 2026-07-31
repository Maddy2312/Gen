import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: null,
    currency: null,
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    setCart: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      state.currency = action.payload.currency;
      state.items = action.payload.items;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCart, addItem, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
