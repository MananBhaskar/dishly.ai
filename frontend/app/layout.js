import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/ui/themes';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dishly.ai - AI-Powered Recipe Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ theme: neobrutalism }}>
    <html lang="en" className="h-full antialiased suppressHydrationWarning">
      <body className={`${inter.className}`}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Toaster richColors/>
        <footer className="py-8 px-4 border-t">
          <div className="max-w-6xl mx-auto flex justify-center items-center">
            <p className="text-stone-500 text-sm">Made with ❤️ by Manan Bhaskar</p>
          </div>
        </footer>
        </body>
    </html>
    </ClerkProvider>
  );
}
