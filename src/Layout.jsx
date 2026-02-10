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

    // Add Stripe tracking script
    const script3 = document.createElement('script');
    script3.innerHTML = `
      (function() {
          'use strict';

          var CONFIG = {
              debug: false,
              stripePaymentDomain: 'buy.stripe.com',
              cookieName: 'cre_tracking_data',
              cookieExpiry: 30
          };

          function log(message, data) {
              if (CONFIG.debug) {
                  console.log('[CRE Tracking]', message, data || '');
              }
          }

          function getGAClientId() {
              try {
                  var gaCookie = document.cookie
                      .split('; ')
                      .find(function(row) { return row.startsWith('_ga='); });
                  
                  if (gaCookie) {
                      var parts = gaCookie.split('.');
                      if (parts.length >= 4) {
                          var clientId = parts.slice(2).join('.');
                          log('Found GA client_id:', clientId);
                          return clientId;
                      }
                  }
              } catch (e) {
                  log('Error getting GA client_id:', e);
              }
              return null;
          }

          function getUTMParams() {
              var urlParams = new URLSearchParams(window.location.search);
              var utmParams = {};
              var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
              
              utmKeys.forEach(function(key) {
                  var value = urlParams.get(key);
                  if (value) {
                      utmParams[key] = value;
                  }
              });

              if (Object.keys(utmParams).length > 0) {
                  log('Found UTM params in URL:', utmParams);
                  storeTrackingData(utmParams);
                  return utmParams;
              }

              var stored = getStoredTrackingData();
              if (stored && stored.utm) {
                  log('Using stored UTM params:', stored.utm);
                  return stored.utm;
              }

              return {};
          }

          function storeTrackingData(utmParams) {
              try {
                  var data = {
                      utm: utmParams,
                      timestamp: Date.now()
                  };
                  var expires = new Date();
                  expires.setDate(expires.getDate() + CONFIG.cookieExpiry);
                  document.cookie = CONFIG.cookieName + '=' + encodeURIComponent(JSON.stringify(data)) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
                  log('Stored tracking data');
              } catch (e) {
                  log('Error storing tracking data:', e);
              }
          }

          function getStoredTrackingData() {
              try {
                  var cookie = document.cookie
                      .split('; ')
                      .find(function(row) { return row.startsWith(CONFIG.cookieName + '='); });
                  
                  if (cookie) {
                      var value = cookie.split('=')[1];
                      return JSON.parse(decodeURIComponent(value));
                  }
              } catch (e) {
                  log('Error getting stored tracking data:', e);
              }
              return null;
          }

          function enhanceStripeLink(url) {
              try {
                  var urlObj = new URL(url);
                  
                  if (urlObj.hostname.indexOf(CONFIG.stripePaymentDomain) === -1) {
                      return url;
                  }

                  var clientId = getGAClientId();
                  if (clientId) {
                      urlObj.searchParams.set('client_reference_id', clientId);
                  }

                  var utmParams = getUTMParams();
                  Object.keys(utmParams).forEach(function(key) {
                      urlObj.searchParams.set(key, utmParams[key]);
                  });

                  var enhancedUrl = urlObj.toString();
                  log('Enhanced Stripe link:', enhancedUrl);
                  return enhancedUrl;
              } catch (e) {
                  log('Error enhancing link:', e);
                  return url;
              }
          }

          function handleLinkClick(event) {
              var link = event.target.closest ? event.target.closest('a') : null;
              if (!link) {
                  var el = event.target;
                  while (el && el.tagName !== 'A') {
                      el = el.parentElement;
                  }
                  link = el;
              }
              if (!link) return;

              var href = link.getAttribute('href');
              if (!href || href.indexOf(CONFIG.stripePaymentDomain) === -1) return;

              var enhancedUrl = enhanceStripeLink(href);
              
              if (enhancedUrl !== href) {
                  event.preventDefault();
                  log('Redirecting to enhanced URL');
                  window.location.href = enhancedUrl;
              }
          }

          function enhanceExistingLinks() {
              var links = document.querySelectorAll('a[href*="' + CONFIG.stripePaymentDomain + '"]');
              links.forEach(function(link) {
                  var originalHref = link.getAttribute('href');
                  var enhancedHref = enhanceStripeLink(originalHref);
                  if (enhancedHref !== originalHref) {
                      link.setAttribute('href', enhancedHref);
                      log('Pre-enhanced link:', enhancedHref);
                  }
              });
          }

          function init() {
              log('Initializing CRE AI Studio tracking script');
              getUTMParams();
              document.addEventListener('click', handleLinkClick, true);
              enhanceExistingLinks();
              log('Tracking script initialized');
          }

          if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
          } else {
              init();
          }

          if (typeof MutationObserver !== 'undefined') {
              var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                      mutation.addedNodes.forEach(function(node) {
                          if (node.nodeType === 1 && node.querySelectorAll) {
                              var links = node.querySelectorAll('a[href*="' + CONFIG.stripePaymentDomain + '"]');
                              links.forEach(function(link) {
                                  var originalHref = link.getAttribute('href');
                                  var enhancedHref = enhanceStripeLink(originalHref);
                                  if (enhancedHref !== originalHref) {
                                      link.setAttribute('href', enhancedHref);
                                  }
                              });
                          }
                      });
                  });
              });

              if (document.body) {
                  observer.observe(document.body, { childList: true, subtree: true });
              } else {
                  document.addEventListener('DOMContentLoaded', function() {
                      observer.observe(document.body, { childList: true, subtree: true });
                  });
              }
          }

      })();
    `;
    document.head.appendChild(script3);

    // Cleanup function
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
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