import { LuLogIn } from "react-icons/lu";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";

interface NavButtonsType {
  setShowModal: (tf: boolean) => void;
  label: string;
}
export default function NavButtons({
  setShowModal,
  label,
}: NavButtonsType) {
  return (
    <button
      onClick={() => setShowModal(true)}
      className="text-white flex items-center font-bold text-xl py-2 px-2 rounded hover:bg-gray-800 cursor-pointer transition"
    >
      {label == "Login" && <LuLogIn className="ml-6" />}
      {label == "Signup" && <RiAddBoxFill className="ml-6" />}
      {label == "Profile" && <BsFillPersonVcardFill className="ml-6" />}
      {label == "Users" && <PiUsersFill className="ml-6" />}


      <p className="ml-4">{label}</p>
    </button>
  );
}
