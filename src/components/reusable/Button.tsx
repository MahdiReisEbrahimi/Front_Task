"use Client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Button({ id }: { id: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="p-1 bg-blue-950 rounded-sm text-white font-bold mt-2 w-full cursor-pointer"
    >
      <Link href={`${id}`}>Details</Link>
    </motion.button>
  );
}
