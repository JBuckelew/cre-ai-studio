import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FreeTrialPopup from "./components/BlackFridayPopup";

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Add Google Fonts link
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Add Rewardful tracking script
    const rewardfulScript = document.createElement('script');
    rewardfulScript.async = true;
    rewardfulScript.src = 'https://r.wdfl.co/rw.js';
    rewardfulScript.setAttribute('data-rewardful', '0b4b9e');
    document.head.appendChild(rewardfulScript);

    // Add Rewardful referral ID passthrough to Stripe Payment Links
    const rewardfulPassthrough = document.createElement('script');
    rewardfulPassthrough.innerHTML = `
      (function() {
        function getReferral() {
          try { return window.Rewardful && Rewardful.referral ? Rewardful.referral : null; }
          catch(e) { return null; }
        }

        function fixUrl(url) {
          var ref = getReferral();
          if (!ref || !url || url.indexOf('buy.stripe.com') === -1 || url.indexOf('client_reference_id') !== -1) return url;
          return url + (url.indexOf('?') !== -1 ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(ref);
        }

        function fixLinks() {
          document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(function(a) { a.href = fixUrl(a.href); });
        }

        var obs = new MutationObserver(fixLinks);
        document.addEventListener('DOMContentLoaded', function() { fixLinks(); obs.observe(document.body, {childList:true, subtree:true}); });

        document.addEventListener('click', function(e) {
          var a = e.target.closest('a');
          if (a && a.href) a.href = fixUrl(a.href);
        }, true);

        var _open = window.open;
        window.open = function(url) { arguments[0] = fixUrl(url); return _open.apply(this, arguments); };

        var _assign = location.assign.bind(location);
        var _replace = location.replace.bind(location);
        location.assign = function(url) { return _assign(fixUrl(url)); };
        location.replace = function(url) { return _replace(fixUrl(url)); };
      })();
    `;
    document.head.appendChild(rewardfulPassthrough);

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

    // Add Meta Pixel base code
    const metaPixelScript = document.createElement('script');
    metaPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1048132540901993');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaPixelScript);

    const metaPixelNoscript = document.createElement('noscript');
    metaPixelNoscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1048132540901993&ev=PageView&noscript=1" />`;
    document.head.appendChild(metaPixelNoscript);

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
      document.head.removeChild(fontLink);
      document.head.removeChild(rewardfulScript);
      document.head.removeChild(rewardfulPassthrough);
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(metaPixelScript);
      document.head.removeChild(metaPixelNoscript);
      document.head.removeChild(script3);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
                {currentPageName !== 'FreeTrialPayment' && currentPageName !== 'Payment' && currentPageName !== 'BlackFridayPayment' && currentPageName !== 'PaymentSuccess' && <FreeTrialPopup />}
                <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}