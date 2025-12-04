
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
            <button onClick={handleHomeClick} className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/75a2876a5_image.png"
                alt="CRE AI Studio Logo"
                className="h-8"
              />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-8">
            <Button
              variant="ghost"
              onClick={handleHomeClick}
              className="text-slate-700 hover:text-blue-600 font-medium"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={handleWhatsIncludedClick}
              className="text-slate-700 hover:text-blue-600 font-medium"
            >
              What's Included
            </Button>
            <Button
              variant="ghost"
              onClick={handleResourcesClick}
              className="text-slate-700 hover:text-blue-600 font-medium"
            >
              Guides
            </Button>
          </div>

          {/* Log In Button */}
          <div className="justify-self-end">
            <Button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Log In
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top row: Logo and Log In */}
          <div className="flex items-center justify-between h-16">
            <button onClick={handleHomeClick} className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/75a2876a5_image.png"
                alt="CRE AI Studio Logo"
                className="h-8"
              />
            </button>
            <Button
              onClick={handleLoginClick}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Log In
            </Button>
          </div>

          {/* Bottom row: Navigation Links */}
          <div className="flex items-center justify-center gap-2 pb-3 border-t border-slate-200 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWhatsIncludedClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs"
            >
              What's Included
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResourcesClick}
              className="text-slate-700 hover:text-blue-600 font-medium text-xs"
            >
              Guides
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
