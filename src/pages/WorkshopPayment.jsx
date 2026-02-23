import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Calendar, Users, Award, ArrowRight } from "lucide-react";

export default function WorkshopPayment() {
  const handlePayment = () => {
    window.location.href = 'https://buy.stripe.com/5kQeVe5FZdXo2SJ4bccV20i';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Join <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI for CRE Attorneys</span>
          </h1>
          <p className="text-xl text-slate-600">
            Complete your registration to secure your seat
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Workshop Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 h-full">
              <CardHeader className="bg-slate-900 text-white rounded-t-xl">
                <CardTitle className="text-2xl">Workshop Details</CardTitle>
                <CardDescription className="text-slate-300">
                  6-week intensive cohort starting March 25, 2026
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">6 Weekly Live Sessions</div>
                      <div className="text-sm text-slate-600">60 minutes each, Tuesdays at 1pm ET</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Limited to 35 Attorneys</div>
                      <div className="text-sm text-slate-600">Small cohort for personalized attention</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Taught by Nadine Ezzie</div>
                      <div className="text-sm text-slate-600">20-year CRE Attorney, AI Speaker</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="font-bold text-slate-900 mb-3">What's Included:</div>
                  <ul className="space-y-2">
                    {[
                      "6 live training sessions with recordings",
                      "6 Months of Free Access to the CRE AI Studio",
                      "Async Q&A access in Circle community",
                      "Ethics framework and usage policy templates",
                      "Document sanitization workflows",
                      "AI toolkit setup and configuration"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN - Payment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl border-0 sticky top-8">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="text-2xl">Investment</CardTitle>
                <CardDescription className="text-blue-100">
                  One-time payment for the complete program
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-black text-slate-900 mb-2">$1,295</div>
                  <div className="text-slate-600">per attorney</div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-bold">Studio Membership Included</div>
                      <div>$249/year value - yours for life</div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Proceed to Payment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-6 text-center text-sm text-slate-600">
                  <p>Secure payment powered by Stripe</p>
                  <p className="mt-2">Questions? Email info@creaistudio.com</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Instant Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}