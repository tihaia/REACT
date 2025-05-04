
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/slice';

/**
 * Redux Store приложения.
 * Здесь объединяются все редьюсеры.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
