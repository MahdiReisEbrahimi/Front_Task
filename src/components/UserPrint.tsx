import Image from "next/image";
import { User } from "@/store/userApi";
import Button from "./reusable/Button";

export default function UserPrint({ user }: { user: User }) {
  return (
    <li className="bg-white rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center shadow-gray-400">
      <div className="relative h-50 w-50 mb-5">
      <Image
        src={user.avatar}
        alt="picture of person"
        fill
        className=" mb-4 rounded-full"
      />
      </div>
      
      <h2 className="text-lg h-7 font-semibold text-gray-800 mb-1">
        {user.first_name}
      </h2>
      <Button id={user.id} />
    </li>
  );
}
