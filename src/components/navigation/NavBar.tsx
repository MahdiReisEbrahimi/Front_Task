"use client";
import MobileNavbar from "./MobileNavbar";
import LaptopNavbar from "./LaptopNavbar";

// main navigation component
export default function Navbar() {
  return (
    <>
      <MobileNavbar />
      <LaptopNavbar />
    </>
  );
}
