import type { Metadata } from "next";
import "./global.css";
import Link from "next/link";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Front Task",
  description: "Space omid frontend task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="overlays" />
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
