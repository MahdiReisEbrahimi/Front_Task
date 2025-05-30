import { useState } from "react";

// Interface for the user data to be updated
interface UpdateUserParams {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

// Interface for the return value of the hook
interface UpdateResult {
  loading: boolean; // Indicates if the update request is in progress
  error: string | null; // Stores any error that occurs during the update
  updatedUser: (UpdateUserParams & { updatedAt?: string }) | null; // Holds the updated user data
  updateUser: (user: UpdateUserParams) => Promise<void>; // Function to trigger the update
}

export function useUpdateUserServer(): UpdateResult {
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store any error
  const [updatedUser, setUpdatedUser] = useState<
    (UpdateUserParams & { updatedAt?: string }) | null
  >(null); // State to store the updated user info

  const updateUser = async (user: UpdateUserParams) => {
    setLoading(true); // Start loading
    setError(null); // Clear any previous error

    try {
      // Send PUT request to update the user
      const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1", // Demo API key (can be removed)
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        }),
      });

      // If the request fails, throw an error
      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      // Parse the response data
      const data = await res.json();

      // Store the updated user data along with the updatedAt timestamp
      setUpdatedUser({
        ...user,
        updatedAt: data.updatedAt,
      });
    } catch (err: any) {
      // Catch and store any error message
      setError(err.message || "Unknown error");
    } finally {
      // Stop loading in both success and failure cases
      setLoading(false);
    }
  };

  // Return states and the update function
  return {
    loading,
    error,
    updatedUser,
    updateUser,
  };
}
