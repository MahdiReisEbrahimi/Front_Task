"use client";
import { use } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import IsLoading from "@/components/reusable/IsLoading";
import { RootState } from "@/store/index";
import { User } from "@/store/userApi";
import WelcomeHeader from "@/components/AuthUser/WelcomHeader";
import ProfilePage from "@/components/AuthUser/ProfilePage";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ userDetail: string }>;
}) {
  const auth = useSelector((state: RootState) => state.auth);
  let authUser: User | null = null;
  if (auth.isAuthenticated) {
    authUser = auth.user;
  }

  const { userDetail } = use(params);
  const id = userDetail;

  const { users } = useLoadUsers();
  const user = users.find((user) => user.id == id);

  const intro = user
    ? `${user.first_name} ${user.last_name} is one of our active users, registered with the email ${user.email}.`
    : "";

  return (
    <>
      {authUser && authUser.id == id ? (
        <>
          <div className="p-4">
            <ProfilePage user={authUser} />
          </div>
        </>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4 py-12">
          {user ? (
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src={user.avatar}
                alt={`Avatar of ${user.first_name}`}
                width={200}
                height={200}
                className="rounded-full mb-4 mx-auto shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                <span className="text-blue-600">{user.email}</span>
              </p>
              <p className="text-md text-gray-700 italic text-left">{intro}</p>
            </div>
          ) : (
            <div className="text-center text-gray-600 text-xl">
              <IsLoading />
            </div>
          )}
        </div>
      )}
    </>
  );
}
