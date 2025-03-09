import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/cart';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userEmail) => {
  const response = await axios.get(`${API_URL}/${userEmail}`);
  return response.data;
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (item) => {
  const response = await axios.post(`${API_URL}/add`, item);
  return response.data;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (item) => {
  const response = await axios.post(`${API_URL}/remove`, item);
  return response.data;
});

export const clearCart = createAsyncThunk('cart/clearCart', async (userEmail) => {
  const response = await axios.post(`${API_URL}/clear`, { userEmail });
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
