import "./globals.css";
import { Nunito } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/ui/themes';
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Dishly.ai - AI-Powered Recipe Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ theme: neobrutalism }}>
      <html lang="en" className="h-full antialiased suppressHydrationWarning">
        <body className={`${nunito.className} bg-[#FFFBF5]`}>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Toaster richColors />
          <footer className="py-8 px-4 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
              {/* Divider */}
              <div className="w-full h-px bg-linear-to-r from-transparent via-orange-200 to-transparent mb-2" />

              {/* Brand + tagline */}
              <div className="flex items-center gap-2">
                <span className="text-xl">🍳</span>
                <span className="font-black text-base text-orange-500 tracking-tight">Dishly.ai</span>
                <span className="text-stone-300 text-sm">·</span>
                <span className="text-stone-400 text-sm font-medium">AI-Powered Cooking</span>
              </div>

              {/* Credit */}
              <p className="text-stone-400 text-xs font-medium tracking-wide">
                Made  by{" "}
                <span className="text-stone-500 font-semibold">Manan Bhaskar</span>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}