import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/models/user";
import { data, s } from "framer-motion/client";

async function fetchData() {
  const response = await fetch("https://reqres.in/api/users");
  const resData = await response.json();
  console.log(resData);
}
const usersInitialState: { users: User[] } = {
  users: [
    {
      id: 1,
      email: "ali@example.com",
      first_name: "Ali",
      last_name: "Moradi",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
    {
      id: 2,
      email: "ali@example.com",
      first_name: "Ali",
      last_name: "Moradi",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    updateUsers(state , action : PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser() {},
    clearUsers() {},
    editUser() {},
    deleteUser() {},
  },
});

export const { addUser, deleteUser, clearUsers, updateUsers } =
  userSlice.actions;
export default userSlice.reducer;
