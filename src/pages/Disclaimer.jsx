import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <p className="text-slate-600 leading-relaxed">
              The Studio provides educational content only. While some sessions may address legal, compliance, or business considerations, nothing in the Studio constitutes legal, financial, or investment advice.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              Participation does not create an attorney-client or fiduciary relationship with any founder or instructor. If you need legal or financial services, consult a qualified professional.
            </p>

            <p className="text-slate-600 leading-relaxed">
              BES.AI, LLC disclaims liability for business outcomes resulting from use of the Studio.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}