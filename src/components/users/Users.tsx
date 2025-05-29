"use client";

import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "../reusable/IsLoading";

export default function Users() {
  const { users, isLoading, error } = useLoadUsers() as {
    users: User[];
    error: unknown;
    isLoading: boolean;
  };

  if (isLoading) return <IsLoading />;

  return (
    <>
      <ul className="grid mt-10 lg:mt-5 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
        {users.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}
