import Image from "next/image";
import { User } from "@/store/userApi";
import Button from "./reusable/Button";

export default function UserPrint({ user }: { user: User }) {
  return (
    <li className="bg-white rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center shadow-gray-400">
      <Image
        src={user.avatar}
        alt="picture of person"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-sm text-gray-500">
        Email: <span className="text-blue-600">{user.email}</span>
      </p>
      <Button id={user.id} />
    </li>
  );
}
