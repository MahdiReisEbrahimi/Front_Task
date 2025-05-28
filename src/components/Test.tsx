"use client";
import { useEffect, useState } from "react";
import { useGetUsersQuery } from "@/store/userApi";
import { User, UserResponse } from "@/store/userApi";
import { useDispatch } from "react-redux";
import { updateUsers } from "@/store/userSlice";
import { button } from "framer-motion/client";

export default function Test() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  const { data, isLoading, error } = useGetUsersQuery(1) as {
    data: UserResponse;
    isLoading: boolean;
    error: unknown;
  };

  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGetUsersQuery(2) as {
    data: UserResponse;
    isLoading: boolean;
    error: unknown;
  };

  useEffect(() => {
    if (data && data2) {
      const combined = [...data.data, ...data2.data];
      setUsers(combined);
      dispatch(updateUsers(combined));
    }
  }, [data, data2, dispatch]);

  if (isLoading || isLoading2) return <p>در حال دریافت داده...</p>;
  if (error || error2) return <p>خطای ناشناخته در دریافت داده.</p>;

  return <></>;
}
