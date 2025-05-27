import { createSlice } from "@reduxjs/toolkit";
import User from "@/models/user";

const usersInitialState: { users: User[] } = {
  users: [
    new User(
      1,
      "ali@example.com",
      "Ali",
      "Moradi",
      "https://reqres.in/img/faces/7-image.jpg"
    ),
    new User(
      2,
      "ali@example.com",
      "Ali",
      "Moradi",
      "https://reqres.in/img/faces/7-image.jpg"
    ),
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    addUser() {},
    clearUsers() {},
    editUser() {},
    deleteUser() {},
  },
});

export const { addUser, deleteUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;
