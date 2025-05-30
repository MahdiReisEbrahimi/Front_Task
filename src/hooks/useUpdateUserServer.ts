import { useState } from "react";

interface UpdateUserParams {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UpdateResult {
  loading: boolean;
  error: string | null;
  updatedUser: (UpdateUserParams & { updatedAt?: string }) | null;
  updateUser: (user: UpdateUserParams) => Promise<void>;
}

export function useUpdateUserServer(): UpdateResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<
    (UpdateUserParams & { updatedAt?: string }) | null
  >(null);

  const updateUser = async (user: UpdateUserParams) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      const data = await res.json();

      setUpdatedUser({
        ...user,
        updatedAt: data.updatedAt,
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updatedUser,
    updateUser,
  };
}
