"use client";

import { useSelector, useDispatch } from "react-redux";
import User from "@/models/user";

export default function Home() {
  const users = useSelector(
    (state: { users: { users: User[] } }) => state.users.users
  );
  console.log(users);
  return <></>;
}
