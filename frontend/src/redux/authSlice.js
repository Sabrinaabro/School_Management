import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'moderator', // Default role (can be admin, clerk, etc.)
  user: null, 
  isAuthenticated: false, 
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = 'guest';
      state.isAuthenticated = false;
    },
  },
});

export const { setRole, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
