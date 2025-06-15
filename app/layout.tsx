import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex as Roboto } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "My Digital Wallet",
  description:
    "A personal asset manager to log and review deposits and withdrawals with intuitive simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="grid grid-rows-[1fr_2rem] grid-cols-[16rem_1fr] h-screen antialiased">
        {/* Sidebar Area */}
        <aside className="w-full bg-sidebar-selected flex">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <main className="flex flex-col">
          <nav className="h-16 bg-header">
            <Header />
          </nav>

          {/* Pages */}
          <div className="flex-1 bg-white">{children}</div>
        </main>

        {/* Footer Area */}
        <footer className="col-span-2 h-full bg-footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
