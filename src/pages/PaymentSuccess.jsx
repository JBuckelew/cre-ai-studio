import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPageUrl } from '@/utils';
import { getStripeSession } from "@/functions/getStripeSession";

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get URL parameters from Stripe redirect
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    // Simulate loading session data
    // In production, you might fetch session details from Stripe
    const session = {
      id: sessionId,
      customer_details: {
        email: urlParams.get('email') || ''
      },
      amount_total: parseFloat(urlParams.get('amount') || '0') * 100,
      metadata: {
        plan: urlParams.get('plan') || 'Not specified'
      }
    };

    // Track Rewardful conversion
    const trackConversion = () => {
      setTimeout(function() {
        if (window.Rewardful) {
          try {
            window.Rewardful('convert', {
              // Customer email (required)
              email: session.customer_details.email,

              // Order ID - using Stripe session ID
              order_id: session.id,

              // Amount - Stripe stores in cents, so divide by 100
              amount: session.amount_total / 100,

              // Track membership level purchased
              metadata: {
                membership_level: session.metadata.plan || 'Not specified',
                membership_type: 'CRE AI Studio Community',
                session_id: session.id
              }
            });

            console.log('✅ Rewardful conversion tracked successfully!');
            console.log('Email:', session.customer_details.email);
            console.log('Amount:', session.amount_total / 100);
            console.log('Plan:', session.metadata.plan);

          } catch (error) {
            console.error('❌ Error tracking Rewardful conversion:', error);
          }
        } else {
          console.error('❌ Rewardful not loaded - check base script installation');
        }
      }, 500);
    };

    if (sessionId) {
      trackConversion();
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

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