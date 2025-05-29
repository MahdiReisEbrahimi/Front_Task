"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { FaIcons } from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import LoginForm from "../Login/LoginForm";
import Signup from "../Signup/Signup";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const navItems = [{ label: "Users", href: "/" }];

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);

  const handleLoginClick = () => {
    setIsOpen(false);
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setIsOpen(false);
    setShowSignupModal(true);
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 w-full bg-blue-500 text-white shadow-md z-[9999]">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-xl font-extrabold tracking-wide flex items-center">
          Users App <FaIcons className="ml-2 text-black" />
        </div>

        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <MdCancel size={24} /> : <SlMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="flex flex-col items-center bg-blue-300 px-4 py-2 space-y-2 absolute top-full left-0 w-full z-50"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-black font-bold border-b border-black w-full text-center py-1 ${
                pathname === item.href ? "bg-white" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!authState.isAuthenticated && (
            <>
              <button
                onClick={handleLoginClick}
                className="text-black font-bold py-1 rounded-xl hover:bg-purple-800 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className="text-black font-bold py-1 rounded-xl hover:bg-purple-800 hover:text-white transition"
              >
                Signup
              </button>
            </>
          )}
        </motion.div>
      )}

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
    </header>
  );
}
