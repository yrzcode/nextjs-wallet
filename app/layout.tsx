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
      <body className="flex h-screen antialiased">
        {/* Sidebar Area */}
        <aside className="w-40 h-full bg-amber-300 flex">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col">
          <header className="h-16 bg-amber-500">
            <Header />
          </header>
          {/* Pages */}
          <section className="flex-1 bg-amber-200">{children}</section>
          <footer className="h-8 bg-amber-500">
            <Footer />
          </footer>
        </main>
      </body>
    </html>
  );
}
