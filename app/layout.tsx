import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthProvider from "../lib/context/AuthProvider";
import ReduxProvider from "@/lib/context/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CustomSpinner, ErrorModal, SucessModal } from "@/components/Modals";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comment Sense",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <main className="max-w-10xl mx-auto">
              {/* <Navbar /> */}

              {children}
              <CustomSpinner />
              <SucessModal />
              <ErrorModal />
              <Toaster />
            </main>
          </AuthProvider>{" "}
        </ReduxProvider>
      </body>
    </html>
  );
}
