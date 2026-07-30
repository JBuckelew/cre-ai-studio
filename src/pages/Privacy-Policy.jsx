import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "CRE AI Studio will not sell your information to third parties.",
    path: "/Privacy-Policy",
  });
  return (
    <div className="min-h-screen bg-slate-50 py-16 flex items-center">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-slate-700 leading-relaxed">
              CRE AI Studio will not sell your information to third parties.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}