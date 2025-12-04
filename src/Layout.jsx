import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FreeTrialPopup from "./components/BlackFridayPopup";

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Add Google Analytics gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-V6HYB523GP';
    document.head.appendChild(script1);

    // Add Google Analytics configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-V6HYB523GP');
    `;
    document.head.appendChild(script2);

    // Cleanup function
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
                {currentPageName !== 'FreeTrialPayment' && currentPageName !== 'Payment' && currentPageName !== 'BlackFridayPayment' && <FreeTrialPopup />}
                <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}