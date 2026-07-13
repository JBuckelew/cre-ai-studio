import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { createPageUrl } from '@/utils';
import { subscribeToBeehiiv } from "@/functions/subscribeToBeehiiv";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Navigation() {
  const handleHomeClick = () => {
    window.location.href = createPageUrl('Home');
  };

  const handleWhatsIncludedClick = () => {
    if (window.location.pathname === '/' || window.location.pathname === createPageUrl('Home')) {
      // If we're on the home page, scroll to the section
      const element = document.getElementById('whats-included');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home page with anchor
      window.location.href = createPageUrl('Home') + '#whats-included';
    }
  };

  const handleResourcesClick = () => {
    window.location.href = createPageUrl('Resources');
  };

  const handleWorkshopClick = () => {
    window.location.href = createPageUrl('ClaudeCohort');
  };

  const handleTeachersClick = () => {
    window.location.href = createPageUrl('MeetYourTeachers');
  };

  const handleLoginClick = () => {
    window.open('https://cre-ai-studio.circle.so/getting-started', '_blank');
  };

  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const openNewsletter = () => {
    setNewsletterSuccess(false);
    setNewsletterEmail("");
    setNewsletterOpen(true);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitting(true);
    try {
      await subscribeToBeehiiv({ email: newsletterEmail });
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    }
    setNewsletterSubmitting(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-16">
          {/* Logo */}
          <div className="justify-self-start">
            <h1
              className="text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              onClick={handleHomeClick}
            >
              CRE AI Studio
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={handleWhatsIncludedClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Memberships
            </Button>
            <Button
              variant="ghost"
              onClick={handleWorkshopClick}
              className="text-orange-600 hover:text-orange-700 font-bold text-sm px-3"
            >
              Claude Cohort
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/Consulting'}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Consulting
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/Articles'}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Free Resources
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = createPageUrl('AffiliateSignup')}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Referral Program
            </Button>
            <Button
              variant="ghost"
              onClick={handleLoginClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Login
            </Button>
          </div>

          {/* Join Now and Log In Buttons */}
          <div className="justify-self-end flex items-center gap-2">
            <Button
              onClick={() => window.location.href = createPageUrl('FreeTrialPayment')}
              className="bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white font-semibold text-sm px-4"
            >
              Get My Free Trial
            </Button>
            <Button
              onClick={openNewsletter}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4"
            >
              Join the Newsletter
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-2">
          {/* Logo */}
          <div className="flex items-center justify-center mb-2">
            <h1
              className="text-base font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              onClick={handleHomeClick}
            >
              CRE AI Studio
            </h1>
          </div>

          {/* Top row: Buttons */}
          <div className="flex items-center justify-center gap-2 mb-2 pb-2 border-b border-slate-200">
            <Button
              size="sm"
              onClick={() => window.location.href = createPageUrl('FreeTrialPayment')}
              className="bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white font-semibold text-xs px-3"
            >
              Get My Free Trial
            </Button>
            <Button
              onClick={openNewsletter}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4"
            >
              Join the Newsletter
            </Button>
          </div>

          {/* Bottom row: Navigation Links */}
          <div className="flex items-center justify-center gap-1 flex-wrap pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWhatsIncludedClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Memberships
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWorkshopClick}
              className="text-orange-600 hover:text-orange-700 font-bold text-xs px-2 h-7"
            >
              Claude Cohort
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/Consulting'}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Consulting
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/Articles'}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Free Resources
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = createPageUrl('AffiliateSignup')}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Referral Program
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoginClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Join Our Newsletter</DialogTitle>
            <DialogDescription className="text-slate-600">
              Get the latest AI news and tips that matter in commercial real estate delivered to your inbox.
            </DialogDescription>
          </DialogHeader>
          {newsletterSuccess ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold py-4">
              <CheckCircle className="w-5 h-5" />
              You're subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-4 mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="h-11"
              />
              <Button
                type="submit"
                disabled={newsletterSubmitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full disabled:opacity-60"
              >
                {newsletterSubmitting ? "Subscribing..." : "Join Our Newsletter"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </nav>
  );
}