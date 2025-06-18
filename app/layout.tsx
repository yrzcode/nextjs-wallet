import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex as Roboto } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppFooter from "@/components/layouts/AppFooter";
import AppNavbar from "@/components/layouts/AppNavbar";
import AppSidebar from "@/components/layouts/AppSiderbar/AppSidebar";

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
            <AppSidebar />

            <div className="flex flex-col w-full">
              <nav className="h-20 bg-header flex items-center">
                <SidebarTrigger
                  className="text-white h-14 w-14"
                  iconSize={30}
                />
                <AppNavbar />
              </nav>

              <main className="flex flex-col flex-1">{children}</main>

              <footer className="bg-footer h-8">
                <AppFooter />
              </footer>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
