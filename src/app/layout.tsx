import type { Metadata } from "next";
import "./global.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/navigation/NavBar";

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
          <main className="ml-0 lg:ml-63">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
