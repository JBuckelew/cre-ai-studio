import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPageUrl } from '@/utils';
import { getStripeSession } from "@/functions/getStripeSession";

export default function PaymentSuccess() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const trackConversion = (email) => {
      const attempt = (tries) => {
        if (tries <= 0) return;
        if (window.rewardful && typeof window.rewardful === 'function') {
          try {
            window.rewardful('convert', { email });
            console.log('✅ Rewardful conversion tracked for:', email);
          } catch (e) {
            console.error('❌ Rewardful convert error:', e);
          }
        } else {
          setTimeout(() => attempt(tries - 1), 500);
        }
      };
      attempt(10);
    };

    // Fire conversion events once on mount when session_id exists
    if (sessionId) {
      const dedupeKey = `purchase_fired_${sessionId}`;
      if (!localStorage.getItem(dedupeKey)) {
        const pollFor = (isReady, fire) => {
          const attempt = (tries) => {
            if (tries <= 0) return;
            if (isReady()) {
              try {
                fire();
              } catch (e) {
                console.error('Tracking fire error:', e);
              }
            } else {
              setTimeout(() => attempt(tries - 1), 300);
            }
          };
          attempt(15);
        };

        pollFor(
          () => typeof window.gtag === 'function',
          () => window.gtag('event', 'purchase', {
            transaction_id: sessionId,
            value: 50,
            currency: 'USD'
          })
        );

        pollFor(
          () => typeof window.fbq === 'function',
          () => window.fbq('track', 'Purchase', { value: 50, currency: 'USD' })
        );

        localStorage.setItem(dedupeKey, '1');
      }

      // Run in background - don't block page render
      getStripeSession({ session_id: sessionId })
        .then(res => {
          const email = res.data?.email;
          if (email) trackConversion(email);
        })
        .catch(e => console.error('Failed to fetch session:', e));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to CRE AI Studio! 🎉
          </CardTitle>
          <p className="text-lg text-slate-600">
            Your payment was successful and your membership is now active.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
            <ol className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold">1.</span>
                <span>Check your email for login instructions and getting started guide</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">2.</span>
                <span>Access our exclusive community platform and training materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">3.</span>
                <span>Join our upcoming live webinars and Q&A sessions</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.open('https://cre-ai-studio.circle.so/getting-started', '_blank')}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Access Community Platform
            </Button>
            <Button
              onClick={() => window.location.href = createPageUrl('Home')}
              variant="outline"
              className="flex-1 h-12"
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}