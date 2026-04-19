import React from "react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from '@/utils';

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
    window.location.href = createPageUrl('Workshops');
  };

  const handleTeachersClick = () => {
    window.location.href = createPageUrl('MeetYourTeachers');
  };

  const handleLoginClick = () => {
    window.open('https://cre-ai-studio.circle.so/getting-started', '_blank');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-16">
          {/* Logo */}
          <div className="justify-self-start">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              CRE AI Studio
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={handleHomeClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Home
            </Button>
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
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Workshops
            </Button>
            <Button
              variant="ghost"
              onClick={handleTeachersClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Teachers
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
              onClick={() => window.location.href = '/Consulting'}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Consulting
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = createPageUrl('AffiliateSignup')}
              className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3"
            >
              Join Our Referral Program
            </Button>
          </div>

          {/* Join Now and Log In Buttons */}
          <div className="justify-self-end flex items-center gap-2">
            <Button
              onClick={() => window.location.href = createPageUrl('FreeTrialPayment')}
              className="bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white font-semibold text-sm px-4"
            >
              Join for Free
            </Button>
            <Button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4"
            >
              Log In
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-2">
          {/* Logo */}
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-base font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
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
              Join for Free
            </Button>
            <Button
              onClick={handleLoginClick}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4"
            >
              Log In
            </Button>
          </div>

          {/* Bottom row: Navigation Links */}
          <div className="flex items-center justify-center gap-1 flex-wrap pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Home
            </Button>
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
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Workshops
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTeachersClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Meet Teachers
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
              onClick={() => window.location.href = '/Consulting'}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Consulting
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = createPageUrl('AffiliateSignup')}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs px-2 h-7"
            >
              Join Our Referral Program
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}