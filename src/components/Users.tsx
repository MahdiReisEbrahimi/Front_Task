"use client";

import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "./reusable/IsLoading";
import Login from "./Login/Login";

export default function Users() {
  const { users, isLoading, error } = useLoadUsers() as {
    users: User[];
    error: unknown;
    isLoading: boolean;
  };

  if (isLoading) return <IsLoading />;

  return (
    <>
      <ul className="grid md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 gap-6 p-6 mt-15">
        {users.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}
