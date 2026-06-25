import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import AudioSystem from "@/components/AudioSystem";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sara Chaudary | Portfolio",
  description: "Interactive portfolio displaying the design thinking, full-stack software engineering, and creative archives of Sara Chaudary.",
  authors: [{ name: "Sara Chaudary" }],
  openGraph: {
    title: "Sara Chaudary | Software Engineer & Creative Architect",
    description: "A premium digital exhibition building experiences between logic and aesthetics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${syne.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="bg-luxury-bg text-luxury-white font-sans min-h-full flex flex-col selection:bg-luxury-gold selection:text-luxury-bg">
        {/* Core Global Interactive Overlays */}
        <CustomCursor />
        <AudioSystem />
        
        {/* Main Workspace */}
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
