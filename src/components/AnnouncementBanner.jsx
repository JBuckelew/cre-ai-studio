import React from "react";
import { motion } from "framer-motion";

export default function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.08) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)'
      }} />
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '0.01em',
        color: '#e2e8f0'
      }}>
        <span style={{ color: '#a5b4fc', fontWeight: '600' }}>CRE AI Studio</span>
        {' '}has now partnered with{' '}
        <span style={{ color: '#a5b4fc', fontWeight: '600' }}>CRE Daily!</span>
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </motion.div>
  );
}