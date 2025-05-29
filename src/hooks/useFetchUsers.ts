"use client";
import { useEffect, useState } from "react";
import { useGetUsersQuery } from "@/store/userApi";
import type { User } from "@/store/userApi";

export function useFetchUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);

  const { data, isLoading, isFetching, isError } = useGetUsersQuery(page);

  useEffect(() => {
    if (data) {
      setAllUsers((prev) => [...prev, ...data.data]);
      const nextPage = page + 1;

      if (nextPage <= data.total_pages) {
        setPage(nextPage); // go for next page
      } else {
        setDone(true);
      }
    }
  }, [data]);

  return {
    users: allUsers,
    isLoading: isLoading || isFetching,
    isError,
    done,
  };
}
