import Home from './pages/Home';
import Payment from './pages/Payment';
import Disclaimer from './pages/Disclaimer';
import privacyPolicy from './pages/Privacy-Policy';
import termsOfUse from './pages/Terms-of-Use';
import cookiePolicy from './pages/Cookie-Policy';
import Resources from './pages/Resources';
import BlackFridayPayment from './pages/BlackFridayPayment';
import FreeTrialPayment from './pages/FreeTrialPayment';
import Articles from './pages/Articles';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Payment": Payment,
    "Disclaimer": Disclaimer,
    "Privacy-Policy": privacyPolicy,
    "Terms-of-Use": termsOfUse,
    "Cookie-Policy": cookiePolicy,
    "Resources": Resources,
    "BlackFridayPayment": BlackFridayPayment,
    "FreeTrialPayment": FreeTrialPayment,
    "Articles": Articles,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};