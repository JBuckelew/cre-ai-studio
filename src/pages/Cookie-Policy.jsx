import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Cookie Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Last updated: 8/26/25
            </p>
            <p className="text-slate-600 leading-relaxed">
              CRE AI Studio, operated by BES.AI, LLC (“Company,” “we,” “our”), uses cookies and similar technologies to improve functionality, analyze usage, and enhance user experience.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">What Are Cookies</h3>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files placed on your device when you visit our site. They help us recognize your device, remember preferences, and provide essential functionality.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Types of Cookies We Use</h3>
              <ul className="text-slate-600 leading-relaxed list-disc list-inside space-y-2">
                <li><span className="font-semibold">Essential Cookies:</span> Required for site operation, login, and payment processing.</li>
                <li><span className="font-semibold">Performance Cookies:</span> Collect information about how visitors use our site to help us improve.</li>
                <li><span className="font-semibold">Functional Cookies:</span> Store your preferences and settings to enhance usability.</li>
                <li><span className="font-semibold">Marketing Cookies:</span> Track engagement with promotions and content to deliver relevant information.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Third-Party Cookies</h3>
              <p className="text-slate-600 leading-relaxed">
                We may allow trusted third-party providers, such as analytics services, community platforms (e.g., Circle), and payment processors (e.g., Stripe), to place cookies on your device. These third parties may collect information about your online activity over time and across different websites.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Managing Cookies</h3>
              <p className="text-slate-600 leading-relaxed">
                You may refuse or delete cookies through your browser settings. Please note that disabling certain cookies may affect functionality and limit access to some features of the Studio.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Consent</h3>
              <p className="text-slate-600 leading-relaxed">
                By continuing to use our website and services, you consent to our use of cookies as described in this policy. If required by law, we will request your explicit consent through a cookie banner.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Changes to this Policy</h3>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted here with a revised “last updated” date.
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}