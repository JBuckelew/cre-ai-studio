import React from "react";
import { createPageUrl } from '@/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {/* Company Logo */}
          <div className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/27cc41577_image.png"
              alt="CRE AI Studio Logo"
              className="h-12"
            />
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href={createPageUrl('Disclaimer')} 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Disclaimer
            </a>
            <a 
              href={createPageUrl('Privacy-Policy')} 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href={createPageUrl('Terms-of-Use')} 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Terms of Use
            </a>
            <a 
              href={createPageUrl('Cookie-Policy')} 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a 
              href={createPageUrl('Admin')} 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Admin
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} CRE AI Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}