import Image from "next/image";
import { User } from "@/store/userApi";

interface WelcomeHeader {
  user: User;
  onEditClick: () => void;
}

// when user logs in , this component is on top of the page.
export default function WelcomeHeader({ user, onEditClick }: WelcomeHeader) {
  return (
    <div className="relative bg-gradient-to-r from-black to-gray-600 text-white py-10 px-6 rounded-sm shadow-md mb-8 overflow-hidden mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="flex items-center space-x-6">
          <div className="relative w-20 h-20">
            <Image
              src={user.avatar}
              alt="User Avatar"
              fill
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div>
            <h1 className="lg:text-3xl sm:text-2xl font-bold">
              Welcome, {user.first_name} 👋
            </h1>
            <p className="text-sm opacity-90">Glad to have you back with us!</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onEditClick}
          className="bg-black p-3 font-bold cursor-pointer hover:bg-gray-300 hover:text-black transition rounded-sm"
        >
          Edit Profile
        </button>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
