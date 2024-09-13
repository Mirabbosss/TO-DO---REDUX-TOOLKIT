import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todo';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});