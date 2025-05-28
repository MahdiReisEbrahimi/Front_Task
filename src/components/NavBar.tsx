"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { FaIcons } from "react-icons/fa";
import Login from "./Login/Login";

const navItems = [{ label: "Users", href: "/" }];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-purple-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-extrabold tracking-wide flex items-center">
          Users App{" "}
          <span className="ml-2">
            <FaIcons color="black" />
          </span>
        </div>

        {/* Desktop Menu */}
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

          <Login />
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MdCancel size={24} /> : <SlMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-300 px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block ${
                pathname === item.href ? "font-bold text-black" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Login />
        </div>
      )}
    </header>
  );
}
