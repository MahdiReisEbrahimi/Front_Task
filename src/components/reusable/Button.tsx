"use Client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Button({ id }: { id: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="p-1 bg-gradient-to-br from-black to-gray-500 rounded-sm text-white mt-6 h-8 w-full cursor-pointer"
    >
      <Link href={`${id}`}>Details</Link>
    </motion.button>
  );
}
