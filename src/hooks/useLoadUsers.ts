import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "@/store/userApi";
import { updateUsers } from "@/store/userSlice";
import { User } from "@/store/userApi";

// Custom hook for loading users from API and managing Redux state
export function useLoadUsers() {
  const dispatch = useDispatch();

  // Access existing users from Redux store
  const reduxUsers = useSelector(
    (state: { users: { users: User[] } }) => state.users.users
  );

  // If Redux store is empty, fetch users from API
  const shouldFetch = reduxUsers.length === 0;

  // Local state to store combined users, track completion, and handle error
  const [combinedUsers, setCombinedUsers] = useState<User[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  // Fetching data for page 1 and 2 using RTK Query
  const query1 = useGetUsersQuery(1, { skip: !shouldFetch });
  const query2 = useGetUsersQuery(2, { skip: !shouldFetch });

  // Determine overall loading and error state
  const isLoading = shouldFetch && (query1.isLoading || query2.isLoading);
  const hasError = query1.isError || query2.isError || !!loadError;

  useEffect(() => {
    // Prevent repeated execution once data is loaded or store is populated
    if (!shouldFetch || isDone) return;

    // Handle error case
    if (query1.isError || query2.isError) {
      setLoadError(query1.error || query2.error);
      setIsDone(true);
      return;
    }

    // Combine and store data once both queries are completed
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
        dispatch(updateUsers(combined)); // Save to Redux store
      }

      setIsDone(true);
    }
  }, [query1, query2, dispatch, shouldFetch, isDone]);

  return {
    users: reduxUsers.length > 0 ? reduxUsers : combinedUsers, // Prefer Redux data
    isLoading: isLoading && !hasError,
    error: loadError,
  };
}
