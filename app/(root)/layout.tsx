import "../globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body className={plusJakartaSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
