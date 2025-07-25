import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "../components/StoreProvider";
import SessionWrapper from "@/components/SessionWrapper";
import B_Navbar from "@/components/B_Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "Style Lab",
  description: "Style Lab is an e-commerce clothing store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.className} antialiased bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]`} >
        <SessionWrapper>
          <StoreProvider>
            <Navbar />
            {children}
            <B_Navbar />
            <Footer />
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
