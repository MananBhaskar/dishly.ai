import React from "react";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";
import { checkUser } from "../lib/checkUser";
import PricingModal from "./PricingModal";
import HowToCookModal from "./HowToCookModal";

const Header = async () => {
  const user = await checkUser();
  return (
    <header className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-stone-50/80 backdrop-blur-md supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-22 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center">
          <Image
            src="/orange-logo.svg"
            alt="Logo"
            width={170}
            height={130}
            className="h-19 w-auto"
          />
        </Link>
        <div className="flex items-center gap-1.5 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-orange-600"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="ml-10 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-orange-600"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full px-4 py-2 font-medium text-stone-600 transition-colors hover:bg-orange-50 hover:text-orange-600">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full px-6 py-2 bg-orange-600 text-white hover:bg-orange-700 font-medium">
                Get Started
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            {/* How to Cook? */}
            <HowToCookModal />

            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${user.subscriptionTier === "pro" ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm " : "cursor-pointer bg-stone-200/50 text-stone-600 border-stone-200 hover:bg-stone-300/50 hover:border-stone-300 px-2"}`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${user.subscriptionTier === "pro" ? "text-white fill-white/20 " : "text-stone-500"}`}
                  />
                  <span>
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
