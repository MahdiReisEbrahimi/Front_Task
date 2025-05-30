"use client";
import { useState } from "react";
import type { User } from "@/store/userApi";

// Custom hook to fetch paginated user data from API
export function useFetchUsers() {
  const [isLoading, setIsLoading] = useState(false); // Indicates loading state
  const [error, setError] = useState<unknown>(null); // Stores any fetch error

  // Function to fetch users across all pages
  const fetchUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    setError(null);

    let allUsers: User[] = [];
    let page = 1;
    let totalPages = 1;

    try {
      // Fetch all pages of users sequentially
      do {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        allUsers = [...allUsers, ...data.data];
        totalPages = data.total_pages;
        page += 1;
      } while (page <= totalPages);

      return allUsers;
    } catch (err) {
      setError(err);
      return []; // Return empty array on error
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return { fetchUsers, isLoading, error };
}
