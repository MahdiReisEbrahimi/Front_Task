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

  // Use the combined loading state from RTK Query
  const isLoading = shouldFetch && (query1.isLoading || query2.isLoading);
  // Use the combined error state from RTK Query or your local error
  const hasError = query1.isError || query2.isError || !!loadError;

  useEffect(() => {
    if (!shouldFetch || isDone) return;

    // Check for errors from RTK Query immediately
    if (query1.isError || query2.isError) {
      setLoadError(query1.error || query2.error);
      setIsDone(true); // Stop further processing
      return;
    }

    // Only process data when both queries have successfully loaded data
    if (
      query1.data &&
      query2.data &&
      !query1.isLoading &&
      !query2.isLoading &&
      !query1.isFetching && // Ensure fetching is complete
      !query2.isFetching
    ) {
      const combined = [...query1.data.data, ...query2.data.data];

      if (combined.length === 0) {
        setLoadError("No users found."); // Set error if no users are found after successful fetch
      } else {
        setCombinedUsers(combined);
        dispatch(updateUsers(combined));
      }

      setIsDone(true); // Mark as done after processing data or setting an error
    }
  }, [query1, query2, dispatch, shouldFetch, isDone]); // Added isFetching to dependency array implicitly via query objects

  return {
    users: reduxUsers.length > 0 ? reduxUsers : combinedUsers,
    isLoading: isLoading && !hasError, // isLoading should be false if there's an error
    error: loadError, // Return the collected error
  };
}
