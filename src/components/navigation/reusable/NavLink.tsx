import { BsFillPersonVcardFill } from "react-icons/bs";
import { PiUsersFill } from "react-icons/pi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface NavLinksType {
  label: string;
  pathname: string;
}

// reusable link component for navigation Links.
export default function NavLink({ label, pathname }: NavLinksType) {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    // if pathname was equal to every link -> that link will have a selected className
    <Link
      href={label == "Users" ? "/" : `${auth.user.id}`}
      className={`w-full text-white flex items-center font-bold text-xl py-2 px-2 rounded hover:bg-gray-800 cursor-pointer transition ${
        label === "Users" && pathname === "/" && "border-l-4"
      } ${label === "Profile" && pathname !== "/" && "border-l-4"}`}
    >
      {/* to select correct icon */}
      {label == "Profile" && <BsFillPersonVcardFill className="ml-6" />}
      {label == "Users" && <PiUsersFill className="ml-6" />}

      <p className="ml-4">{label}</p>
    </Link>
  );
}
