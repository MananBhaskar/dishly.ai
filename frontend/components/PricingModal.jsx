"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import PricingSection from "./PricingSection";
import { Sparkles } from "lucide-react";

const PricingModal = ({ subscriptionTier = "free" }) => {

    const [isOpen, setIsOpen] = useState(false);
    const canOpen = subscriptionTier === "free";
  return (
    <Dialog open={isOpen} onOpenChange={canOpen ? setIsOpen : undefined}>
      <DialogTrigger
        disabled={!canOpen}
        className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all ${
          subscriptionTier === "pro"
            ? "border-transparent bg-linear-to-r from-orange-600 to-amber-500 text-white shadow-sm"
            : "cursor-pointer border-stone-200 bg-stone-200/50 px-2 text-stone-600 hover:border-stone-300 hover:bg-stone-300/50"
        }`}
      >
        <Sparkles
          className={`h-3 w-3 ${
            subscriptionTier === "pro"
              ? "fill-white/20 text-white"
              : "text-stone-500"
          }`}
        />
        <span>{subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}</span>
      </DialogTrigger>
      <DialogContent className="p-8 pt-4 sm:max-w-4xl">
          <DialogTitle />
          <PricingSection />
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
