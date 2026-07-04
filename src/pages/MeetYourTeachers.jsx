import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import FoundersSection from "../components/landing/FoundersSection";

export default function MeetYourTeachers() {
  usePageMeta({
    title: "Meet Your Teachers",
    description: "AI training that transforms your CRE practice. Meet the founders behind CRE AI Studio and learn how they help commercial real estate professionals put AI to work.",
    path: "/MeetYourTeachers",
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <FoundersSection />
    </div>
  );
}