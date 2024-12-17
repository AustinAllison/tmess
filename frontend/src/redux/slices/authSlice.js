// src/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    // Replace with real API call
    if (email === 'user@example.com' && password === 'password123') {
      // Simulate server response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { name: 'John Doe', email };
    } else {
      // Simulate server error
      return thunkAPI.rejectWithValue('Invalid email or password');
    }
  }
);

// Mock async thunks for other actions (register, fetchCurrentUser)
export const registerUser = createAsyncThunk(/* ... */);
export const fetchCurrentUser = createAsyncThunk(/* ... */);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // Handle other thunks similarly
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
