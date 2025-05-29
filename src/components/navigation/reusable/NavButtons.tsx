import { LuLogIn } from "react-icons/lu";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

interface NavButtonsType {
  setShowModal: (tf: boolean) => void;
  label: string;
}
export default function NavButtons({ setShowModal, label }: NavButtonsType) {
  const dispatch = useDispatch();

  function buttonClickHandler() {
    if (label === "Logout") {
      dispatch(logout());
    } else {
      setShowModal(true);
    }
  }
  return (
    <button
      onClick={buttonClickHandler}
      className="text-white flex items-center font-bold text-xl py-2 px-2 rounded hover:bg-gray-800 cursor-pointer transition"
    >
      {label == "Login" && <LuLogIn className="ml-6" />}
      {label == "Logout" && <FaPowerOff className="ml-6" />}
      {label == "Signup" && <RiAddBoxFill className="ml-6" />}

      <p className="ml-4">{label}</p>
    </button>
  );
}
