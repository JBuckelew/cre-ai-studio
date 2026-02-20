/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Admin from './pages/Admin';
import AffiliateSignup from './pages/AffiliateSignup';
import Articles from './pages/Articles';
import BlackFridayPayment from './pages/BlackFridayPayment';
import cookiePolicy from './pages/Cookie-Policy';
import Disclaimer from './pages/Disclaimer';
import FreeTrialPayment from './pages/FreeTrialPayment';
import Home from './pages/Home';
import MeetYourTeachers from './pages/MeetYourTeachers';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import privacyPolicy from './pages/Privacy-Policy';
import Resources from './pages/Resources';
import termsOfUse from './pages/Terms-of-Use';
import Workshop from './pages/Workshop';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "AffiliateSignup": AffiliateSignup,
    "Articles": Articles,
    "BlackFridayPayment": BlackFridayPayment,
    "Cookie-Policy": cookiePolicy,
    "Disclaimer": Disclaimer,
    "FreeTrialPayment": FreeTrialPayment,
    "Home": Home,
    "MeetYourTeachers": MeetYourTeachers,
    "Payment": Payment,
    "PaymentSuccess": PaymentSuccess,
    "Privacy-Policy": privacyPolicy,
    "Resources": Resources,
    "Terms-of-Use": termsOfUse,
    "Workshop": Workshop,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};