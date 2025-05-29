"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaIcons } from "react-icons/fa";
import Modal from "../UI/Modal";
import LoginForm from "../Login/LoginForm";
import Signup from "../Signup/Signup";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import NavButtons from "./reusable/NavButtons";
import NavLink from "./reusable/NavLink";

export default function LaptopNavbar() {
  const pathname = usePathname();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <>
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-black text-white flex-col px-6 py-4 shadow-lg z-[9999]">
        <div className="text-2xl font-bold flex items-center mb-10 mt-8 ml-8">
          Userly <FaIcons className="ml-2 text-white" />
        </div>
        <nav className="flex flex-col space-y-4">
          <NavLink label="Users" pathname={pathname}></NavLink>
          {authState.isAuthenticated && (
            <NavLink label="Profile" pathname={pathname}></NavLink>
          )}
          <NavButtons
            setShowModal={setShowLoginModal}
            label={authState.isAuthenticated ? "Logout" : "Login"}
          ></NavButtons>
          <NavButtons
            setShowModal={setShowSignupModal}
            label="Signup"
          ></NavButtons>
        </nav>
      </aside>

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}

      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <Signup onClose={() => setShowSignupModal(false)} />
        </Modal>
      )}
    </>
  );
}
