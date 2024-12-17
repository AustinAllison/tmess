import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUser } from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Rehydrate user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  store.dispatch(setUser(user));
}

export default store;
