import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userApi";

const usersInitialState: { users: User[] } = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    // Replace all users
    updateUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    // Add a single user
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },

    // Clear all users
    clearUsers(state) {
      state.users = [];
    },

    // Edit a user by ID
    editUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // Delete a user by ID
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser, editUser, clearUsers, updateUsers } =
  userSlice.actions;
export default userSlice.reducer;
