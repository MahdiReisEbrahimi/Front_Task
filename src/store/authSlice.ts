import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    id: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.id = action.payload.id;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
