"use client";
import { useState } from "react";
import type { User } from "@/store/userApi";

export function useFetchUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    setError(null);
    let allUsers: User[] = [];
    let page = 1;
    let totalPages = 1;

    try {
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
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUsers, isLoading, error };
}
