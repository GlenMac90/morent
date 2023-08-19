import "../globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Provider from "../providers/Provider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Morent",
  description: "The best platform for car rental",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${plusJakartaSans.className} bg-white200 dark:bg-gray900`}
        >
          <Provider>
            <NavBar />
            {children}
            <Toaster />
            <Footer />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
