"use client";
import { useSelector } from "react-redux";
import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import Test from "./Test";

export default function Users() {
  const users = useSelector(
    (state: { users: { users: User[] } }) => state.users.users
  );

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {users.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>
      <Test />
    </>
  );
}
