"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { FaIcons } from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "./UI/Modal";
import LoginForm from "./Login/LoginForm";

const navItems = [
  { label: "Users", href: "/" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleNavigationClick = () => setIsOpen(false);
  const handleLoginClick = () => {
    setIsOpen(false);
    setShowLoginModal(true);
  };
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-blue-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-xl font-extrabold tracking-wide flex items-center">
          Users App{" "}
          <span className="ml-2">
            <FaIcons color="black" />
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? "font-bold border-b-2 border-white"
                  : "hover:text-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-black font-bold cursor-pointer py-1 rounded-xl hover:bg-purple-800 hover:text-white transition"
          >
            Login
          </button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
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
          className="md:hidden mt-0.5 flex flex-col items-center bg-blue-300 px-4 py-2 space-y-2 absolute top-full left-0 w-full z-50"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavigationClick}
              className="block text-black font-bold border-b-1 border-black w-full text-center py-1"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLoginClick}
            className="text-black font-bold cursor-pointer py-1 rounded-xl hover:bg-purple-800 hover:text-white transition"
          >
            Login
          </button>
        </motion.div>
      )}

      {/* Modal for Login */}
      {showLoginModal && (
        <Modal onClose={closeLoginModal}>
          <LoginForm onClose={closeLoginModal} />
        </Modal>
      )}
    </header>
  );
}
