import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import FacebookAdLanding from './pages/FacebookAdLanding';
import Newsletter from './pages/Newsletter';
import Speaking from './pages/Speaking';
import Training from './pages/Training';
import Workshops from './pages/Workshops';
import WorkshopDashboard from './pages/WorkshopDashboard';
import UseCases from './pages/UseCases';
import UseCaseArticle from './pages/UseCaseArticle';
import UseCaseToolCategory from './pages/UseCaseToolCategory';
import UseCaseTaskCategory from './pages/UseCaseTaskCategory';
import UseCaseRentRollCleanup from './pages/UseCaseRentRollCleanup';
import UseCaseClaudeExcelProforma from './pages/UseCaseClaudeExcelProforma';
import UseCaseLeaseAbstraction from './pages/UseCaseLeaseAbstraction';
import UseCasePropertyManagementGrokBot from './pages/UseCasePropertyManagementGrokBot';
import UseCaseUnderwritingModelReview from './pages/UseCaseUnderwritingModelReview';
import UseCaseDueDiligencePackage from './pages/UseCaseDueDiligencePackage';
import UseCaseMultifamilyUnderwritingCowork from './pages/UseCaseMultifamilyUnderwritingCowork';
import UseCaseSpreadsheetErrorCheck from './pages/UseCaseSpreadsheetErrorCheck';
import UseCaseChiefOfStaffBrokerage from './pages/UseCaseChiefOfStaffBrokerage';
import UseCaseOffMarketDealSourcing from './pages/UseCaseOffMarketDealSourcing';
import UseCaseToolClaude from './pages/UseCaseToolClaude';
import UseCaseToolChatgpt from './pages/UseCaseToolChatgpt';
import UseCaseToolGrokBot from './pages/UseCaseToolGrokBot';
import UseCaseToolExcel from './pages/UseCaseToolExcel';
import UseCaseToolManus from './pages/UseCaseToolManus';
import UseCaseTaskUnderwriting from './pages/UseCaseTaskUnderwriting';
import UseCaseTaskLeasing from './pages/UseCaseTaskLeasing';
import UseCaseTaskPropertyManagement from './pages/UseCaseTaskPropertyManagement';
import UseCaseTaskRentRolls from './pages/UseCaseTaskRentRolls';
import UseCaseTaskDueDiligence from './pages/UseCaseTaskDueDiligence';
import UseCaseTaskBrokerage from './pages/UseCaseTaskBrokerage';
import UseCaseTaskDealSourcing from './pages/UseCaseTaskDealSourcing';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/FacebookAdLanding" element={<FacebookAdLanding />} />
      <Route path="/Newsletter" element={<Newsletter />} />
      <Route path="/speaking" element={
        <LayoutWrapper currentPageName="Speaking">
          <Speaking />
        </LayoutWrapper>
      } />
      <Route path="/training" element={
        <LayoutWrapper currentPageName="Training">
          <Training />
        </LayoutWrapper>
      } />
      <Route path="/Workshops" element={
        <LayoutWrapper currentPageName="Workshops">
          <Workshops />
        </LayoutWrapper>
      } />
      <Route path="/WorkshopDashboard" element={
        <LayoutWrapper currentPageName="WorkshopDashboard">
          <WorkshopDashboard />
        </LayoutWrapper>
      } />
      <Route path="/use-cases" element={
        <LayoutWrapper currentPageName="UseCases">
          <UseCases />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/claude" element={
        <LayoutWrapper currentPageName="UseCaseToolClaude">
          <UseCaseToolClaude />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/chatgpt" element={
        <LayoutWrapper currentPageName="UseCaseToolChatgpt">
          <UseCaseToolChatgpt />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/grok-bot" element={
        <LayoutWrapper currentPageName="UseCaseToolGrokBot">
          <UseCaseToolGrokBot />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/excel" element={
        <LayoutWrapper currentPageName="UseCaseToolExcel">
          <UseCaseToolExcel />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/manus" element={
        <LayoutWrapper currentPageName="UseCaseToolManus">
          <UseCaseToolManus />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/tool/:tool" element={
        <LayoutWrapper currentPageName="UseCaseToolCategory">
          <UseCaseToolCategory />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/underwriting" element={
        <LayoutWrapper currentPageName="UseCaseTaskUnderwriting">
          <UseCaseTaskUnderwriting />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/leasing" element={
        <LayoutWrapper currentPageName="UseCaseTaskLeasing">
          <UseCaseTaskLeasing />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/property-management" element={
        <LayoutWrapper currentPageName="UseCaseTaskPropertyManagement">
          <UseCaseTaskPropertyManagement />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/rent-rolls" element={
        <LayoutWrapper currentPageName="UseCaseTaskRentRolls">
          <UseCaseTaskRentRolls />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/due-diligence" element={
        <LayoutWrapper currentPageName="UseCaseTaskDueDiligence">
          <UseCaseTaskDueDiligence />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/brokerage" element={
        <LayoutWrapper currentPageName="UseCaseTaskBrokerage">
          <UseCaseTaskBrokerage />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/deal-sourcing" element={
        <LayoutWrapper currentPageName="UseCaseTaskDealSourcing">
          <UseCaseTaskDealSourcing />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/task/:task" element={
        <LayoutWrapper currentPageName="UseCaseTaskCategory">
          <UseCaseTaskCategory />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/ai-rent-roll-cleanup-prompt" element={
        <LayoutWrapper currentPageName="UseCaseRentRollCleanup">
          <UseCaseRentRollCleanup />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/claude-for-excel-real-estate-proforma" element={
        <LayoutWrapper currentPageName="UseCaseClaudeExcelProforma">
          <UseCaseClaudeExcelProforma />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/ai-lease-abstraction-claude-chatgpt-template" element={
        <LayoutWrapper currentPageName="UseCaseLeaseAbstraction">
          <UseCaseLeaseAbstraction />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/ai-for-property-management-grok-bot-staff" element={
        <LayoutWrapper currentPageName="UseCasePropertyManagementGrokBot">
          <UseCasePropertyManagementGrokBot />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/real-estate-underwriting-model-review-claude-chatgpt" element={
        <LayoutWrapper currentPageName="UseCaseUnderwritingModelReview">
          <UseCaseUnderwritingModelReview />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/real-estate-due-diligence-package-grok-bot" element={
        <LayoutWrapper currentPageName="UseCaseDueDiligencePackage">
          <UseCaseDueDiligencePackage />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/multifamily-underwriting-claude-cowork" element={
        <LayoutWrapper currentPageName="UseCaseMultifamilyUnderwritingCowork">
          <UseCaseMultifamilyUnderwritingCowork />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/ai-spreadsheet-analysis-error-check-real-estate" element={
        <LayoutWrapper currentPageName="UseCaseSpreadsheetErrorCheck">
          <UseCaseSpreadsheetErrorCheck />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/ai-chief-of-staff-cre-brokerage-claude" element={
        <LayoutWrapper currentPageName="UseCaseChiefOfStaffBrokerage">
          <UseCaseChiefOfStaffBrokerage />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/off-market-commercial-real-estate-ai-deal-sourcing" element={
        <LayoutWrapper currentPageName="UseCaseOffMarketDealSourcing">
          <UseCaseOffMarketDealSourcing />
        </LayoutWrapper>
      } />
      <Route path="/use-cases/:slug" element={
        <LayoutWrapper currentPageName="UseCaseArticle">
          <UseCaseArticle />
        </LayoutWrapper>
      } />
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App