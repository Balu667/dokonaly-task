import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../../pages/Auth/AuthSlice';

export const store = configureStore({
  reducer: {
    auth:AuthSlice
  },
})