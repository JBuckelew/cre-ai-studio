import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, Loader2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BlackFridayPaymentPage() {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      level: 1,
      name: "Level 1: The Basics Plan",
      originalPrice: 50,
      discountedPrice: 35,
      yearlyTotal: 420,
      description: <><span className="text-green-400">Weekly video step-by-step lessons</span> on how to streamline your workflows with AI and automation.</>,
      stripe_url: "https://buy.stripe.com/5kQ9AU9Wf5qS1OF378cV207"
    },
    {
      level: 2,
      name: "Level 2: The Achiever Plan",
      originalPrice: 75,
      discountedPrice: 53,
      yearlyTotal: 636,
      description: <>Everything in Level 1 plus <span className="text-purple-400">LIVE monthly VIP training sessions with Q&A.</span></>,
      stripe_url: "https://buy.stripe.com/14AdRaecv5qS50R5fgcV208"
            },
            {
              level: 3,
      name: "Level 3: The Super Growth Plan",
      originalPrice: 100,
      discountedPrice: 70,
      yearlyTotal: 840,
      description: <>Everything in Level 2 plus <span className="text-amber-400">direct access to founders</span> for unlimited Q&A via a dedicated channel. Questions will be answered within 24 hours (your own personal AI consultants).</>,
      popular: true,
      stripe_url: "https://buy.stripe.com/aFa3cwgkD06y78Z9vwcV209"
    },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    const plan = plans.find(p => p.level === selectedLevel);

    if (plan && plan.stripe_url) {
      window.location.href = plan.stripe_url;
    } else {
      alert("Payment link not configured yet");
      setIsProcessing(false);
    }
  };
  
  const selectedPlan = plans.find(p => p.level === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center">
            {/* Black Friday Badge */}
            <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse mx-auto">
              BLACK FRIDAY 2025 — 30% OFF 🎉
            </div>
            <CardTitle className="text-5xl font-bold mb-4 tracking-tight leading-none bg-gradient-to-r from-purple-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
              CRE AI Studio
            </CardTitle>
            <CardDescription className="text-slate-300 text-xl">
              Choose Your Plan — 30% Off for 12 Months
            </CardDescription>
            <p className="text-sm text-gray-400 mt-2">
              *Requires 12-month commitment to lock in this rate
            </p>
          </CardHeader>
          <CardContent className="space-y-4 px-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.level}
                layout
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => setSelectedLevel(plan.level)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${
                  selectedLevel === plan.level
                    ? 'border-yellow-400 bg-yellow-500/10 shadow-lg'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 right-4 bg-yellow-500 text-black flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </Badge>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-slate-100 mt-2 text-lg font-semibold leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="text-right pl-4">
                    <p className="text-lg text-gray-500 line-through">${plan.originalPrice}/mo</p>
                    <p className="text-3xl font-black text-yellow-400">${plan.discountedPrice}<span className="text-lg">/mo</span></p>
                    <p className="text-yellow-300 text-sm font-semibold">${plan.yearlyTotal} billed annually</p>
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
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold text-sm rounded-xl transition-all duration-300 group disabled:opacity-70"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay ${plan.yearlyTotal} — Save 30%
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </CardContent>
          <CardFooter className="px-8 pt-6">
            {/* Desktop-only button */}
            <div className="hidden md:block w-full">
              <Button
                size="lg"
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold text-lg rounded-xl transition-all duration-300 group disabled:opacity-70"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${selectedPlan.yearlyTotal} — Save 30%
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