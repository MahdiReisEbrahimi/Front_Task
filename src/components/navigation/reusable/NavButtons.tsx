"use client";

import { LuLogIn } from "react-icons/lu";
import { RiAddBoxFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

interface NavButtonsType {
  label: string;
  onClick: (label: string) => void;
}

export default function NavButtons({ label, onClick }: NavButtonsType) {
  const dispatch = useDispatch();

  function buttonClickHandler() {
    if (label === "Logout") {
      dispatch(logout());
    } else {
      onClick(label);
    }
  }

  return (
    <button
      onClick={buttonClickHandler}
      className="text-white flex items-center font-bold text-xl py-2 px-2 rounded hover:bg-gray-800 cursor-pointer transition"
    >
      {label === "Login" && <LuLogIn className="ml-6" />}
      {label === "Logout" && <FaPowerOff className="ml-6" />}
      {label === "Signup" && <RiAddBoxFill className="ml-6" />}
      <p className="ml-4">{label}</p>
    </button>
  );
}
