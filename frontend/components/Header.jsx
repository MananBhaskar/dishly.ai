import React from "react";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";
import { checkUser } from "../lib/checkUser";
import PricingModal from "./PricingModal";
import HowToCookModal from "./HowToCookModal";

const Header = async () => {
  const user = await checkUser();
  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b-2 border-orange-100 shadow-[0_4px_24px_-4px_rgba(251,146,60,0.18)]">
      {/* Top accent stripe */}
      <div className="h-1 w-full bg-linear-to-r from-orange-400 via-red-500 to-amber-400" />

      <nav className="container mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">

        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 sm:gap-3 shrink-0 group">
          <span className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-400 to-red-500 shadow-md shadow-orange-200 text-lg sm:text-2xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-orange-300 group-hover:rotate-6">
            🍳
          </span>
          <span className="text-lg sm:text-2xl font-black tracking-tight leading-none">
            <span className="text-stone-800">dish</span><span className="text-orange-500">ly</span><span className="text-stone-400 text-base sm:text-xl font-semibold">.ai</span>
          </span>
        </Link>

        {/* Nav Links — hidden on mobile, visible from md */}
        <div className="hidden md:flex items-center gap-2 text-sm font-bold">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-stone-600 border-2 border-transparent transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:shadow-sm"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-orange-100 text-orange-500">
              <Cookie className="w-3.5 h-3.5" />
            </span>
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-stone-600 border-2 border-transparent transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-sm"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-emerald-500">
              <Refrigerator className="w-3.5 h-3.5" />
            </span>
            My Pantry
          </Link>
        </div>

        {/* Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Show when="signed-out">
            {/* Sign In: text only on sm, hidden on xs */}
            <SignInButton mode="modal">
              <button className="hidden sm:block px-4 py-2 text-sm font-bold text-stone-600 rounded-xl border-2 border-stone-200 bg-white transition-all duration-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white border-2 border-orange-400 shadow-md shadow-orange-200 hover:from-orange-600 hover:to-red-600 transition-all duration-200 whitespace-nowrap">
                <span className="hidden sm:inline">🍳 </span>Get Started
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            {/* HowToCook: icon only on mobile */}
            <span className="hidden sm:block">
              <HowToCookModal />
            </span>

            {/* Mobile nav icons */}
            <div className="flex md:hidden items-center gap-1">
              <Link href="/recipes" className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-orange-500">
                <Cookie className="w-4 h-4" />
              </Link>
              <Link href="/pantry" className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500">
                <Refrigerator className="w-4 h-4" />
              </Link>
            </div>

            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 sm:h-9 px-2 sm:px-4 gap-1 sm:gap-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border-2 ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-500 to-amber-400 text-white border-orange-400 shadow-md shadow-orange-200"
                      : "bg-white text-stone-500 border-stone-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 ${
                      user.subscriptionTier === "pro"
                        ? "text-yellow-200 fill-yellow-200/50"
                        : "text-stone-400"
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;