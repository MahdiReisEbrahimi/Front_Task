"use client";
import { use } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "@/components/reusable/IsLoading";
import { RootState } from "@/store/index";
import { User } from "@/store/userApi";
import ProfilePage from "@/components/AuthUser/ProfilePage";
import Error from "@/components/reusable/Error";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ userDetail: string }>;
}) {
  const auth = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.users.users);

  let authUser: User | null = null;
  if (auth.isAuthenticated) {
    authUser = auth.user;
  }

  const { userDetail } = use(params);
  const id = userDetail;

  const { error } = useLoadUsers();

  const user = users.find((user) => user.id == id);

  const intro = user
    ? `${user.first_name} ${user.last_name} is one of our active users, registered with the email ${user.email}.`
    : "";

  {
    user || (
      <Error message="An Error accured! incorrect user id is requested." />
    );
    error && <Error message="An Error accured during fetch data!" />;
  }

  return (
    <>
      {authUser && authUser.id == id ? (
        <div className="p-4">
          <ProfilePage id={authUser.id} />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r  from-gray-600 to-black flex items-center justify-center px-4 py-12">
          {user ? (
            <div className="bg-black/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-50 h-50 mb-7 m-auto">
                <Image
                  src={user.avatar}
                  alt={`Avatar of ${user.first_name}`}
                  fill
                  className="rounded-full mx-auto border-4 border-gray-700 shadow-lg"
                />
              </div>

              <h2 className="text-3xl font-bold text-white mb-1 tracking-wide">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-gray-400 mb-4 mt-5">
                <span>Registered with : </span>
                <span className="text-orange-400">{user.email}</span>
              </p>
              <p className="text-md text-gray-300 text-left leading-relaxed">
                {intro}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-xl">
              <IsLoading />
            </div>
          )}
        </div>
      )}
    </>
  );
}
