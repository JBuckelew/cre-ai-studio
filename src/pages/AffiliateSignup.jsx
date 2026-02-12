import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Users } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
            <CardDescription className="text-base">
              Thank you for your interest in becoming a CRE AI Studio affiliate. We'll review your application and send you an affiliate link once approved.
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
            Become an Affiliate
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Join our affiliate program and earn commissions by promoting CRE AI Studio to your network.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Apply for Affiliate Program</CardTitle>
            <CardDescription>
              Fill out the form below and we'll review your application. Once approved, you'll receive your unique affiliate link.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earn Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Get rewarded for every referral that signs up through your unique link.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Easy Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Track your referrals and earnings in real-time through your affiliate dashboard.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Marketing Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">Access promotional materials and resources to help you succeed.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}