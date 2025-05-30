import { useAddUserMutation } from "@/store/userApi";
import { useCallback } from "react";
import { User } from "@/store/userApi";

// to send user data to api and return server response
export function useSignup() {
  const [addUser, { isLoading, error, data }] = useAddUserMutation(); // RTK query API request.

  const signup = useCallback(
    async (newUser: User) => {
      try {
        const response = await addUser(newUser).unwrap();
        return { success: true, data: response };
      } catch (err) {
        return { success: false, error: err };
      }
    },
    [addUser]
  );

  return { signup, isLoading, error, data };
}
