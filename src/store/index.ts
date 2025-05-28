// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { userApi } from "./userApi";

const store = configureStore({
  reducer: {
    users: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
