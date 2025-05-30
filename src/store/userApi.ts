import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// API QUERYs useing RTK
export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/",
    prepareHeaders: (headers) => {
      headers.set("x-api-key", "reqres-free-v1");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, number>({
      query: (page = 1) => `users?page=${page}`,
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = userApi;
