import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, DollarSign, TrendingUp, Gift } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Application Submitted! 🎉</CardTitle>
            <CardDescription className="text-base">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              CRE AI Studio
            </h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Join Our Referral Program! 🚀
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto drop-shadow">
            Earn commissions by sharing CRE AI Studio with your network and help others unlock the power of AI in commercial real estate.
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
            <CardTitle className="text-2xl">Apply for Referral Program</CardTitle>
            <CardDescription>
              Fill out the form below and we'll review your application. Once approved, you'll receive your unique referral link and start earning!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="h-11"
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
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Application 🎯"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-white/95 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-blue-900">Earn Commissions 💰</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Get rewarded for every referral that signs up through your unique link. Watch your earnings grow!</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-blue-900">Easy Tracking 📊</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Track your referrals and earnings in real-time through your intuitive dashboard.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-blue-900">Marketing Support 🎁</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Access promotional materials and resources to help you succeed and close more deals.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}