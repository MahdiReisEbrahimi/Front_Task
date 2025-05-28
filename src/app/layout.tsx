import type { Metadata } from "next";
import "./global.css";
import Link from "next/link";
import ReduxProvider from "@/providers/ReduxProvider";

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
        <ReduxProvider>
          <header className="p-2 bg-blue-400">
            <ul className="flex justify-around">
              <li>
                <Link href={"/"}>Users</Link>
              </li>
              <li>
                <Link href={"/details"}>User Datail</Link>
              </li>
            </ul>
          </header>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
