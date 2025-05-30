import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "@/store/userApi";
import { updateUsers } from "@/store/userSlice";
import { User } from "@/store/userApi";

export function useLoadUsers() {
  const dispatch = useDispatch();

  const reduxUsers = useSelector(
    (state: { users: { users: User[] } }) => state.users.users
  );

  const shouldFetch = reduxUsers.length === 0;

  const [combinedUsers, setCombinedUsers] = useState<User[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null); // Renamed to avoid conflict with RTK Query's error

  const query1 = useGetUsersQuery(1, { skip: !shouldFetch });
  const query2 = useGetUsersQuery(2, { skip: !shouldFetch });

  const isLoading = shouldFetch && (query1.isLoading || query2.isLoading);
  const hasError = query1.isError || query2.isError || !!loadError;

  useEffect(() => {
    if (!shouldFetch || isDone) return;

    if (query1.isError || query2.isError) {
      setLoadError(query1.error || query2.error);
      setIsDone(true);
      return;
    }

    if (
      query1.data &&
      query2.data &&
      !query1.isLoading &&
      !query2.isLoading &&
      !query1.isFetching &&
      !query2.isFetching
    ) {
      const combined = [...query1.data.data, ...query2.data.data];

      if (combined.length === 0) {
        setLoadError("No users found.");
      } else {
        setCombinedUsers(combined);
        dispatch(updateUsers(combined));
      }

      setIsDone(true);
    }
  }, [query1, query2, dispatch, shouldFetch, isDone]);

  return {
    users: reduxUsers.length > 0 ? reduxUsers : combinedUsers,
    isLoading: isLoading && !hasError,
    error: loadError,
  };
}
