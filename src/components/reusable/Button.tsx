"use Client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Button({ id }: { id: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="p-1 bg-pink-400 rounded-sm text-white font-bold mt-2 h-10 w-full cursor-pointer"
    >
      <Link href={`${id}`}>Details</Link>
    </motion.button>
  );
}
