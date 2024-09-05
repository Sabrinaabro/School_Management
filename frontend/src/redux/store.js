import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer that handles authentication

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers here if needed
  },
});

export default store;
