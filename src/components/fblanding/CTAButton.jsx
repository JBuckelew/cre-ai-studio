import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CHECKOUT_URL = "https://creaistudio.com/FreeTrialPayment";

export default function CTAButton({
  label = "Start Your 7-Day Free Trial",
  ctaId = "cta",
  size = "lg",
  variant = "default",
  className = "",
  full = false,
}) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={`bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 group ${full ? "w-full" : ""} ${className}`}
    >
      <a href={CHECKOUT_URL} data-cta={ctaId} className={full ? "w-full flex items-center justify-center gap-2" : "flex items-center gap-2"}>
        {label}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </Button>
  );
}