"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Button({ id }: { id: string }) {
  const [isOpening, setIsOpening] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpening(true);
    router.push(`/${id}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      disabled={isOpening}
      className="p-1 bg-gradient-to-br from-black to-gray-500 rounded-sm text-white mt-6 h-8 w-full cursor-pointer disabled:opacity-50"
    >
      {isOpening ? "opening..." : "Details"}
    </motion.button>
  );
}
