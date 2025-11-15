import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vaibhav - Full Stack Web Developer",
  description: "Full-stack developer with a focus on AI and software engineering. Building modern, scalable web apps like Tracknest and FundForage to solve real-world problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full m-0 p-0`}
      >
        {children}
        <Analytics />
        <ToastContainer />
      </body>
    </html>
  );
}
