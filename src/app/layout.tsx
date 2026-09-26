import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RefreshLoader from "@/components/Refresh";
import { PlanProvider } from "@/context/PlanContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library",
    template: "FitLog — %s",
  },
  description: "FitLog - Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <RefreshLoader />

          <Navbar />

          {children}

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={100}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </PlanProvider>
      </body>
    </html>
  );
}