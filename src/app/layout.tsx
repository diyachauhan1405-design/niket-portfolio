import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galleries by Nik | Visuals by Nik — Editorial & Portrait Photography",
  description:
    "Editorial portraiture, maternity monographs, milestones & cinematic storytelling. Directed & captured by Nik.",
  keywords: ["Galleries by Nik", "Visuals by Nik", "Niket Photography", "editorial portrait photographer", "maternity photographer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#070707] text-[#f2f0eb] font-sans selection:bg-[#d1a85b]/30 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
