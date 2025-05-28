"use client";
import { useState } from "react";
import Modal from "../UI/Modal";
import { motion } from "framer-motion";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store/index";
import LoginForm from "./LoginForm";

export default function Login() {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const isLogedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-purple-200 text-black font-bold cursor-pointer px-4 py-1 rounded-xl shadow hover:bg-purple-800 hover:text-white transition"
        onClick={openModalHandler}
      >
        {isLogedIn ? "Logout" : "Login"}
      </motion.button>

      {showModal && (
        <Modal onClose={closeModalHandler}>
          <LoginForm onClose={closeModalHandler} />
        </Modal>
      )}
    </>
  );
}
