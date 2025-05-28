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
  }),
});

export const { useGetUsersQuery } = userApi;
