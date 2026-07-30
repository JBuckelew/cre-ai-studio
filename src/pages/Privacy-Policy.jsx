import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "Privacy policy for CRE AI Studio, operated by BES.AI, LLC — how we collect, use, and protect your information.",
    path: "/Privacy-Policy",
  });
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Last updated: 8/26/25
            </p>
            <p className="text-slate-600 leading-relaxed">
              CRE AI Studio, operated by BES.AI, LLC, values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website, community, or services (collectively, the “Studio”).
            </p>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Information We Collect</h3>
              <p className="text-slate-600 leading-relaxed">
                We may collect personal identifiers (such as your name, email, and billing details), account activity (such as course progress or community posts), and technical data (such as IP address, browser, and cookies). 
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">How We Use Information</h3>
              <p className="text-slate-600 leading-relaxed">
                We use collected information to:
              </p>
              <ul className="text-slate-600 leading-relaxed list-disc list-inside">
                <li>Provide you with access to the Studio;</li>
                <li>Process payments and manage subscriptions;</li>
                <li>Improve and enhance the Studio;</li>
                <li>Communicate updates, offers, and customer support;</li>
                <li>Enforce these Policies and applicable law.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Information Sharing</h3>
              <p className="text-slate-600 leading-relaxed">
                We do not sell your personal data. We may share it with trusted third-party vendors who assist us in providing services (such as Circle for community hosting, Stripe for payments, or analytics providers). These vendors are contractually bound to use your information only as directed by us.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Data Security and Retention</h3>
              <p className="text-slate-600 leading-relaxed">
                We use reasonable administrative, physical, and technical safeguards to protect your personal information. We retain data only as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Your Rights</h3>
              <p className="text-slate-600 leading-relaxed">
                Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us. .
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}