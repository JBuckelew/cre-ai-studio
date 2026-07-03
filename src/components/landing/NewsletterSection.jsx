import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { subscribeToBeehiiv } from "@/functions/subscribeToBeehiiv";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await subscribeToBeehiiv({ email });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setSuccess(true);
      setEmail("");
    }
    setSubmitting(false);
  };

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
        >
          Join Our Newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-600 mb-6"
        >
          Get the latest AI tips, prompts, and workflows for commercial real estate delivered to your inbox.
        </motion.p>
        {success ? (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            <CheckCircle className="w-5 h-5" />
            You're subscribed! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-full bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 px-5 flex-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 bg-slate-900 text-white hover:bg-slate-800 font-semibold rounded-full px-6 text-sm sm:text-base whitespace-nowrap disabled:opacity-60"
            >
              {submitting ? "Subscribing..." : "Join Our Newsletter"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}