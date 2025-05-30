"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import LoginForm from "./LoginForm";
import { useTransition } from "react";

export default function Login({ onClick }: { onClick: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openModalHandler = () => {
    setShowModal(true);
    startTransition(() => {
      onClick(); // close mobile menu
    });
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const isLogedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="text-black font-bold cursor-pointer py-1 rounded-xl hover:bg-purple-800 hover:text-white transition"
        onClick={openModalHandler}
      >
        {isLogedIn ? "Logout" : "Login"}
      </motion.button>

      {showModal && <LoginForm onClose={closeModalHandler} />}
    </>
  );
}
