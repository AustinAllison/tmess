// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Adjust path if necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});

export default store;
