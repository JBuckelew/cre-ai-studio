import React, { useState } from 'react';
import { usePageMeta } from "@/hooks/usePageMeta";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, Loader2, Star, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FreeTrialPaymentPage() {
  usePageMeta({
    title: "Free Trial",
    description: "Start your 7-day free trial of CRE AI Studio. Choose the membership plan that fits your CRE practice — weekly AI tutorials, prompt library, live coaching, and community access.",
    path: "/FreeTrialPayment",
  });
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const monthlyPlans = [
    {
      level: 1,
      name: "Level 1: The Basics Plan",
      price: 50,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li><span className="text-green-400">Weekly step-by-step video lessons</span> on how to streamline your workflows with AI, or pre-packaged <span className="text-green-400">AI skills built for CRE</span></li>
          <li>Live lessons and AI updates</li>
          <li>Monthly Office Hours for basic questions</li>
          <li>Access to our CRE Prompt Library</li>
          <li>AI updates & prompting tips</li>
          <li>+ Access to a community with hundreds of CRE pros learning to put AI to work</li>
        </ul>
      ),
      stripe_url: "https://buy.stripe.com/6oU7sM4BV2eG64V7nocV20a"
    },
    {
      level: 2,
      name: "Level 2: The Achiever Plan",
      price: 75,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Everything in Level 1</li>
          <li><span className="text-purple-400">LIVE monthly VIP training sessions with Q&A</span></li>
        </ul>
      ),
      full: true,
      stripe_url: "https://buy.stripe.com/3cI4gA6K33iKbpfbDEcV206"
    },
    {
      level: 3,
      name: "Level 3: The Super Growth Plan",
      price: 100,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Everything in Levels 1 & 2 +</li>
          <li><span className="text-amber-400">Direct access to founders</span> for unlimited Q&A via dedicated channel</li>
          <li>Questions answered within 24 hours (your own personal AI consultants)</li>
        </ul>
      ),
      stripe_url: "https://buy.stripe.com/7sYfZid8r6uW64V6jkcV20b"
    },
  ];

  const annualPlans = [
    {
      level: 1,
      name: "Level 1: The Basics Plan",
      originalPrice: 50,
      discountedPrice: 40,
      yearlyTotal: 480,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li><span className="text-green-400">Weekly step-by-step video lessons</span> on how to streamline your workflows with AI, or pre-packaged <span className="text-green-400">AI skills built for CRE</span></li>
          <li>Live lessons and AI updates</li>
          <li>Monthly Office Hours for basic questions</li>
          <li>Access to our CRE Prompt Library</li>
          <li>AI updates & prompting tips</li>
          <li>+ Access to a community with hundreds of CRE pros learning to put AI to work</li>
        </ul>
      ),
      stripe_url: "https://buy.stripe.com/dRm4gA7O77z0fFv7nocV20h"
    },
    {
      level: 2,
      name: "Level 2: The Achiever Plan",
      originalPrice: 75,
      discountedPrice: 60,
      yearlyTotal: 720,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Everything in Level 1</li>
          <li><span className="text-purple-400">LIVE monthly VIP training sessions with Q&A</span></li>
        </ul>
      ),
      full: true,
      stripe_url: "https://buy.stripe.com/cNi4gA6K35qSdxn6jkcV20g"
    },
    {
      level: 3,
      name: "Level 3: The Super Growth Plan",
      originalPrice: 100,
      discountedPrice: 80,
      yearlyTotal: 960,
      description: (
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Everything in Levels 1 & 2 +</li>
          <li><span className="text-amber-400">Direct access to founders</span> for unlimited Q&A via dedicated channel</li>
          <li>Questions answered within 24 hours (your own personal AI consultants)</li>
        </ul>
      ),
      stripe_url: "https://buy.stripe.com/bJedRa4BV06y78Z4bccV20f"
    },
  ];

  const plans = billingCycle === 'monthly' ? monthlyPlans : annualPlans;

  const handlePayment = () => {
    setIsProcessing(true);
    const plan = plans.find(p => p.level === selectedLevel);

    if (plan && plan.stripe_url && !plan.full) {
      const url = new URL(plan.stripe_url);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      const pageParams = new URLSearchParams(window.location.search);
      utmKeys.forEach(key => {
        const value = pageParams.get(key);
        if (value) url.searchParams.set(key, value);
      });
      window.location.href = url.toString();
    } else {
      alert("Payment link not configured yet");
      setIsProcessing(false);
    }
  };
  
  const selectedPlan = plans.find(p => p.level === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 py-16 relative overflow-hidden">
      {/* Background Elements - matching hero section */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-2">
            {/* Free Trial Badge */}
            <div className="inline-block bg-blue-500/10 border border-blue-400/30 text-blue-300 px-6 py-2 rounded-full text-sm font-semibold mb-6 mx-auto">
              7-DAY FREE TRIAL 🚀
            </div>
            <CardTitle className="text-5xl font-black mb-3 tracking-tight leading-none text-white">
              CRE AI Studio
            </CardTitle>
            <CardDescription className="text-slate-300 text-xl font-light">
                Start Your Free Trial Today
              </CardDescription>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-0 mt-6 border border-white/10 rounded-xl overflow-hidden w-fit mx-auto">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 font-semibold transition-all text-sm ${
                    billingCycle === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-5 py-2.5 font-semibold transition-all flex items-center gap-2 text-sm ${
                    billingCycle === 'annual'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Annual
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    billingCycle === 'annual' ? 'bg-black/20 text-black' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    20% OFF
                  </span>
                </button>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-sm text-gray-400 mt-2">
                  *Requires 12-month commitment to lock in this rate
                </p>
              )}

              {/* Trial Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>7 days free</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Full access</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.level}
                layout
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => !plan.full && setSelectedLevel(plan.level)}
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  plan.full
                    ? 'border-red-500/40 bg-white/5 opacity-60 cursor-not-allowed'
                    : selectedLevel === plan.level
                      ? billingCycle === 'annual'
                        ? 'border-yellow-400/60 bg-yellow-500/10 shadow-lg shadow-yellow-500/10 cursor-pointer'
                        : 'border-blue-500/60 bg-blue-500/10 shadow-lg shadow-blue-500/10 cursor-pointer'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer'
                  }`}
              >
                {plan.full && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 z-20 pointer-events-none">
                    <span className="bg-red-600 text-white text-3xl font-black px-8 py-1.5 rounded shadow-lg tracking-widest">
                      FULL
                    </span>
                  </div>
                )}
                {plan.popular && (
                  <Badge className={`absolute -top-3 right-4 flex items-center gap-1 ${
                    billingCycle === 'annual' ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'
                  }`}>
                    <Star className="w-3 h-3" /> Most Popular
                  </Badge>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-slate-100 mt-2 text-lg font-semibold leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="text-right pl-4">
                    <p className={`text-sm font-semibold ${billingCycle === 'annual' ? 'text-yellow-400' : 'text-blue-400'}`}>7 days free, then</p>
                    {billingCycle === 'monthly' ? (
                      <>
                        <p className="text-3xl font-black text-white">${plan.price}</p>
                        <p className="text-slate-400 text-sm">/ month</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg text-gray-500 line-through">${plan.originalPrice}/mo</p>
                        <p className="text-3xl font-black text-yellow-400">${plan.discountedPrice}<span className="text-lg">/mo</span></p>
                        <p className="text-yellow-300 text-sm font-semibold">${plan.yearlyTotal} billed annually</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile-only button that appears on selection */}
                {selectedLevel === plan.level && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden"
                  >
                    <Button
                      size="lg"
                      className={`w-full font-bold text-sm rounded-full transition-all duration-300 group disabled:opacity-70 ${
                        billingCycle === 'annual'
                          ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                          : 'bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white hover:opacity-90'
                      }`}
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : billingCycle === 'monthly' ? (
                        <>
                          Start Free Trial
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          Start Free Trial — Save 20%
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </CardContent>
          <CardFooter className="px-8 pt-6 pb-8">
              {/* Desktop-only button */}
              <div className="hidden md:block w-full">
                <Button
                  size="lg"
                  className={`w-full font-bold text-lg rounded-full transition-all duration-300 group disabled:opacity-70 ${
                    billingCycle === 'annual'
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                      : 'bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white hover:opacity-90'
                  }`}
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : billingCycle === 'monthly' ? (
                    <>
                      Start Free Trial — Then ${selectedPlan.price}/mo
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Start Free Trial — Then ${selectedPlan.yearlyTotal}/yr (Save 20%)
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}