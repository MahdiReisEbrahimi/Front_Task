"use client";

import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import { useLoadUsers } from "@/hooks/useLoadUsers";

export default function Users() {
  const { users } = useLoadUsers() as { users: User[] };

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {users.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}
