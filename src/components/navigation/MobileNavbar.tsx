"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { FaIcons } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../UI/Modal";
import Signup from "../Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { LuLogIn } from "react-icons/lu";
import { RiAddBoxFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { PiUsersFill } from "react-icons/pi";
import { logout } from "@/store/authSlice";
import LoginForm from "../Login/LoginForm";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Handle mobile menu open/close
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Toggle login modal and close menu
  const handleLoginClick = () => {
    setIsOpen(false);
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Handle logout and close menu
  const handleLogoutClick = () => {
    setIsOpen(false);
    dispatch(logout());
  };

  // Toggle signup modal and close menu
  const handleSignupClick = () => {
    setIsOpen(false);
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 w-full bg-black text-white shadow-md z-[9999]">
      {/* Top navigation bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-xl font-bold flex items-center">
          Userly <FaIcons className="ml-2 text-white" />
        </div>
        {/* Toggle menu button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white"
        >
          {isOpen ? (
            <MdCancel size={26} className="cursor-pointer" />
          ) : (
            <SlMenu size={26} className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Animated dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-black border-t-1 text-white px-4 py-4 space-y-3"
          >
            {/* Always-visible -> Users link */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center text-center py-2 rounded font-semibold transition ${
                pathname === "/" && "border-1 border-white"
              }`}
            >
              <PiUsersFill className="mr-2" />
              Users
            </Link>

            {/* Conditionally render profile link if logged in */}
            {authState.isAuthenticated && (
              <Link
                href={`${authState.user.id}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center text-center py-2 rounded font-semibold transition ${
                  pathname !== "/" && "border-1 border-white"
                }`}
              >
                <BsFillPersonVcardFill className="mr-2" />
                Profile
              </Link>
            )}

            {/* Auth buttons based on authentication status */}
            {!authState.isAuthenticated ? (
              <>
                <button
                  onClick={handleLoginClick}
                  className="w-full cursor-pointer flex items-center justify-center py-2 rounded bg-gray-700 hover:bg-gray-600 transition text-white font-semibold"
                >
                  <LuLogIn className="mr-2" />
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="w-full cursor-pointer flex items-center justify-center py-2 rounded bg-gray-700 hover:bg-gray-600 transition text-white font-semibold"
                >
                  <RiAddBoxFill className="mr-1" />
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={handleLogoutClick}
                className="w-full cursor-pointer flex items-center justify-center py-2 rounded bg-red-900 hover:bg-red-800 transition text-white font-semibold"
              >
                <FaPowerOff className="mr-2" />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}

      {/* Signup modal */}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <Signup onClose={() => setShowSignupModal(false)} />
        </Modal>
      )}
    </header>
  );
}
