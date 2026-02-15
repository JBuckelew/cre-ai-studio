import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, DollarSign, TrendingUp, Gift, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AffiliateSignup() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await base44.entities.AffiliateApplication.create({
        name: formData.name,
        email: formData.email,
        status: "pending"
      });
      
      setSubmitted(true);
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error('Affiliate application error:', error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Application Submitted!</CardTitle>
            <CardDescription className="text-base text-slate-600 mt-2">
              Thank you for your interest in becoming a CRE AI Studio referral partner. We'll review your application and send you your unique referral link once approved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-8 sm:py-12">
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl xl:max-w-screen-xl border-2 border-white/10 shadow-2xl shadow-blue-500/20">
        <div className="relative z-10 flex flex-col items-start justify-start min-h-[50vh] py-10 sm:py-16 px-6 sm:px-12 lg:px-16">
          <div className="flex-1 flex items-center justify-start w-full">
            <div className="relative max-w-full lg:max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  CRE AI Studio
                </h1>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              >
                Join Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Referral Program</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto"
              >
                Earn commissions by sharing CRE AI Studio with your network and help others unlock the power of AI in commercial real estate.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-12 px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-slate-50 rounded-t-xl">
              <CardTitle className="text-2xl text-slate-900">Apply for Referral Program</CardTitle>
              <CardDescription className="text-slate-600">
                Fill out the form below and we'll review your application. Once approved, you'll receive your unique referral link and start earning!
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 bg-slate-50 border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 bg-slate-50 border-slate-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-full transition-all duration-300 group"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-900">Earn Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">Get rewarded for every referral that signs up through your unique link. Watch your earnings grow!</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-900">Easy Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">Track your referrals and earnings in real-time through your intuitive dashboard.</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-900">Marketing Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">Access promotional materials and resources to help you succeed and close more deals.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}