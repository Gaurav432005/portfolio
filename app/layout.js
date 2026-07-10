import { Space_Grotesk } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Cursor from "@/components/ui/Cursor";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Gaurav | Full Stack Developer",
  description:
    "Portfolio of Gaurav, a Full Stack Developer crafting modern web experiences with React, Next.js, Three.js, and creative UI/UX.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${space.variable} ${poppins.variable} antialiased`}>
      <body className="bg-primary text-secondary">
      <SmoothScroll>
        <Cursor />
        {children}
      </SmoothScroll>
      </body>
    </html>
  );
}