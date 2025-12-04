import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Terms of Use
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Last updated: 8/26/25
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              These Terms of Use ("Terms") govern your access to and use of the CRE AI Studio platform, community, courses, and related services (collectively, the "Studio"). The Studio is operated by BES.AI, LLC d/b/a CRE AI Studio ("Company," "we," "our," or "us").
            </p>

            <p className="text-slate-600 leading-relaxed">
              By subscribing to or using the Studio, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, Cookie Policy, and Disclaimer. If you do not agree, you must discontinue use of the Studio.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">1. Studio Access and Membership</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Access to the Studio is subscription-based. You agree to pay all applicable fees for the membership tier you select.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">Membership tiers include:</p>
              <ul className="text-slate-600 leading-relaxed list-disc list-inside mb-3">
                <li>Level 1: Weekly video lessons.</li>
                <li>Level 2: Level 1 + monthly live training with Q&A.</li>
                <li>Level 3: Level 2 + direct access to founders through a private channel with 24-hour guaranteed response.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Access is limited to the individual Subscriber. You may not share your login credentials or permit others to access your account.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">2. Intellectual Property Rights</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                All Studio content, including but not limited to videos, lessons, templates, recordings, community posts, and documents, is owned by BES.AI, LLC d/b/a CRE AI Studio or our licensors.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                You are granted a limited, non-transferable, non-sublicensable license to use Studio content for your personal educational purposes only.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may not copy, reproduce, republish, sell, resell, sublicense, or otherwise exploit Studio content for commercial purposes without our written consent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">3. Restrictions</h3>
              <p className="text-slate-600 leading-relaxed mb-3">You agree not to:</p>
              <ul className="text-slate-600 leading-relaxed list-disc list-inside">
                <li>Publish or distribute Studio content in any medium without authorization.</li>
                <li>Use the Studio in any manner that damages or impairs its functionality.</li>
                <li>Engage in unauthorized advertising, solicitation, or promotion inside the Studio.</li>
                <li>Use the Studio for unlawful purposes or in violation of applicable laws.</li>
                <li>Attempt to scrape, extract, or harvest data from the Studio.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">4. Refund and Cancellation Policy</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Subscriptions are billed in advance on a monthly basis. You may cancel your subscription at any time through your account settings.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Cancellations will take effect at the end of the current billing cycle. We do not issue pro-rated or retroactive refunds for unused portions of a subscription period. Refunds will only be granted in cases required by applicable law or in the event of a verified billing error.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">5. Community Guidelines</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                The Studio includes an online community intended to foster collaboration, learning, and professional growth. By participating, you agree to:
              </p>
              <ul className="text-slate-600 leading-relaxed list-disc list-inside mb-3">
                <li>Engage respectfully and professionally with other members;</li>
                <li>Avoid harassment, discrimination, or offensive conduct;</li>
                <li>Refrain from posting or sharing confidential client or employer information;</li>
                <li>Not use the community to advertise, solicit, or promote unrelated services;</li>
                <li>Respect the intellectual property rights of others.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to moderate or remove posts and to suspend or terminate access to the community for violations of these Guidelines, without refund.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">6. No Legal or Financial Advice</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                The Studio provides educational content only. While certain sessions may address legal, compliance, or financial considerations, nothing in the Studio constitutes legal advice, financial advice, or investment advice.
              </p>
              <p className="text-slate-600 leading-relaxed">
                No attorney-client or fiduciary relationship is created by participation. For legal or financial advice, you must engage a licensed professional.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">7. Disclaimers and Limitation of Liability</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                The Studio is provided "as is" without warranties of any kind, express or implied. We do not guarantee specific outcomes from participation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, the Company shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Studio.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">8. Indemnification</h3>
              <p className="text-slate-600 leading-relaxed">
                You agree to indemnify and hold harmless BES.AI, LLC d/b/a CRE AI Studio, its officers, employees, and affiliates from any claims, damages, liabilities, or expenses arising out of your violation of these Terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">9. Termination</h3>
              <p className="text-slate-600 leading-relaxed">
                We may suspend or terminate your subscription at any time if you violate these Terms, our Community Guidelines, or applicable law. Upon termination, your access to Studio content will cease immediately.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">10. Changes to Terms</h3>
              <p className="text-slate-600 leading-relaxed">
                We may update these Terms from time to time. The "last updated" date will be revised accordingly. Continued use of the Studio after changes indicates acceptance.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">11. Governing Law and Jurisdiction</h3>
              <p className="text-slate-600 leading-relaxed">
                These Terms are governed by the laws of the State of Ohio. You agree to submit to the jurisdiction of courts located in Ohio for resolution of disputes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">12. Entire Agreement</h3>
              <p className="text-slate-600 leading-relaxed">
                These Terms, together with our Privacy Policy, Cookie Policy, Disclaimer, Refund Policy, and Subscription Agreement, constitute the entire agreement between you and BES.AI, LLC d/b/a CRE AI Studio.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}