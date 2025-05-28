"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "@/store/userApi";
import { updateUsers } from "@/store/userSlice";
import { User, UserResponse } from "@/store/userApi";

export function useLoadUsers() {
  const dispatch = useDispatch();

  const reduxUsers = useSelector(
    (state: { users: { users: User[] } }) => state.users.users
  );

  // checking redux => if fetched before ? dont fetch again :
  const shouldFetch = reduxUsers.length === 0;

  const [combinedUsers, setCombinedUsers] = useState<User[]>([]);
  const [isDone, setIsDone] = useState(false);

  const query1 = useGetUsersQuery(1, { skip: !shouldFetch }) as {
    data?: UserResponse;
    isLoading: boolean;
    error?: unknown;
  };

  const query2 = useGetUsersQuery(2, { skip: !shouldFetch }) as {
    data?: UserResponse;
    isLoading: boolean;
    error?: unknown;
  };

  useEffect(() => {
    if (
      shouldFetch &&
      query1.data &&
      query2.data &&
      !query1.isLoading &&
      !query2.isLoading &&
      !isDone
    ) {
      const combined = [...query1.data.data, ...query2.data.data];
      setCombinedUsers(combined);
      dispatch(updateUsers(combined));
      setIsDone(true); // prevent server fetching.
    }
  }, [query1.data, query2.data, dispatch, shouldFetch, isDone]);

  return {
    users: reduxUsers.length > 0 ? reduxUsers : combinedUsers,
    isLoading: shouldFetch && (query1.isLoading || query2.isLoading),
    error: query1.error || query2.error,
  };
}
