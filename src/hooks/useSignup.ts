import { useAddUserMutation } from "@/store/userApi";
import { useCallback } from "react";
import { User } from "@/store/userApi";

export function useSignup() {
  const [addUser, { isLoading, error, data }] = useAddUserMutation();

  const signup = useCallback(
    async (newUser: User) => {
      try {
        const response = await addUser(newUser).unwrap();
        return { success: true, data: response };
      } catch (err) {
        console.log("Error adding user", err);
        return { success: false, error: err };
      }
    },
    [addUser]
  );

  return { signup, isLoading, error, data };
}
