"use client";

import { User } from "@/store/userApi";
import UserPrint from "./UserPrint";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "../reusable/IsLoading";
import { IoReloadCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { updateUsers } from "@/store/userSlice";
import Error from "../reusable/Error";

import { useState } from "react";

const USERS_PER_PAGE = 6;

export default function Users() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

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

  // calculating every page users:
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

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
        {currentUsers.map((user) => (
          <UserPrint key={user.id} user={user} />
        ))}
      </ul>

      <div className="flex justify-center mb-10 gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-1 cursor-pointer rounded  mb-5 ${
              currentPage === pageNum
                ? "bg-gray-200 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </>
  );
}
