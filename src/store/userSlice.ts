import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userApi";

const usersInitialState: { users: User[] } = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    updateUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    clearUsers() {},
    editUser() {},
    deleteUser() {},
  },
});

export const { addUser, deleteUser, clearUsers, updateUsers } =
  userSlice.actions;
export default userSlice.reducer;
