"use client";

import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "../reusable/IsLoading";
import { IoReloadCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { updateUsers } from "@/store/userSlice";
import Error from "../reusable/Error";

export default function Users() {
  const dispatch = useDispatch();

  const { users, isLoading, error } = useLoadUsers() as {
    users: User[];
    error: unknown;
    isLoading: boolean;
  };

  const {
    fetchUsers,
    isLoading: isReloading,
    error: newFetchError,
  } = useFetchUsers();

  async function reloadClickHandler() {
    try {
      const freshUsers = await fetchUsers();
      dispatch(updateUsers(freshUsers));
    } catch (err) {
      console.error("Reload failed:", err);
    }
  }

  if (isLoading || isReloading) return <IsLoading />;
  if (error || newFetchError) {
    return (
      <Error message="Error loading users. Please check your internet connection or try again later." />
    );
  }

  return (
    <>
      <button
        onClick={reloadClickHandler}
        type="button"
        className="mt-20 cursor-pointer flex items-center m-auto  bg-black hover:bg-gray-700 text-white font-bold p-2 text-lg rounded-3xl"
      >
        <p className="ml-2">Reload Users</p>{" "}
        <IoReloadCircle className="text-3xl ml-2" />
      </button>
      <ul className="grid mt-10 lg:mt-5 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
        {users.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}
