import Admin from './pages/Admin';
import Articles from './pages/Articles';
import BlackFridayPayment from './pages/BlackFridayPayment';
import cookiePolicy from './pages/Cookie-Policy';
import Disclaimer from './pages/Disclaimer';
import FreeTrialPayment from './pages/FreeTrialPayment';
import Home from './pages/Home';
import Payment from './pages/Payment';
import privacyPolicy from './pages/Privacy-Policy';
import Resources from './pages/Resources';
import termsOfUse from './pages/Terms-of-Use';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Articles": Articles,
    "BlackFridayPayment": BlackFridayPayment,
    "Cookie-Policy": cookiePolicy,
    "Disclaimer": Disclaimer,
    "FreeTrialPayment": FreeTrialPayment,
    "Home": Home,
    "Payment": Payment,
    "Privacy-Policy": privacyPolicy,
    "Resources": Resources,
    "Terms-of-Use": termsOfUse,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};