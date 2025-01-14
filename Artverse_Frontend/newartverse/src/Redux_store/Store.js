import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/slice/Add_to_cart_slice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your cart slice here
  },
});

export default store;
