import React, { useState } from "react";
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.company) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to database
      await base44.entities.ContactSignup.create({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        company: formData.company,
        source: "contact_us"
      });
      
      // Show success message
      alert("Thank you! We'll get back to you at hello@creaistudio.com soon.");
      setFormData({ first_name: "", last_name: "", email: "", company: "" });
      setIsContactDialogOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Contact form error:', error);
      alert("There was an error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
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
            <a 
              href="/speaking" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Speaking
            </a>
            <button
              onClick={() => setIsContactDialogOpen(true)}
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </button>
          </div>
        </div>

        {/* Contact Dialog */}
        <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Contact Us</DialogTitle>
              <DialogDescription className="text-slate-300">
                Send us a message at hello@creaistudio.com
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full transition-all duration-300 group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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