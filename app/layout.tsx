import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex as Roboto } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
      <body className="antialiased h-screen">
        <div>
          <SidebarProvider>
            <Sidebar />

            <div className="flex flex-col w-full">
              <main className="flex flex-col flex-1">
                <nav className="h-20 bg-header">
                  <SidebarTrigger
                    className="text-white h-14 w-14"
                    iconSize={30}
                  />
                  <Header />
                </nav>
                <div className="flex-1 bg-white">{children}</div>
              </main>

              <footer className="bg-footer h-8">
                <Footer />
              </footer>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
