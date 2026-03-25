import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PackageDetailsPage from './pages/PackageDetailsPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import * as Static from './pages/StaticPages'

// Scroll handler
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage type="Login" />} />
          <Route path="/signup" element={<AuthPage type="Sign Up" />} />
          <Route path="/track/:trackingNumber" element={<PackageDetailsPage />} />

          {/* Admin Section */}
          <Route path="/kirikuadminman/login" element={<AdminLogin />} />
          <Route path="/kirikuadminman/dashboard" element={<AdminDashboard />} />

          {/* Static Pages */}
          <Route path="/about" element={<Static.AboutUs />} />
          <Route path="/team" element={<Static.Team />} />
          <Route path="/careers" element={<Static.Careers />} />
          <Route path="/partners" element={<Static.Partners />} />
          <Route path="/education" element={<Static.Education />} />
          <Route path="/infrastructure" element={<Static.Infrastructure />} />
          <Route path="/solutions" element={<Static.Solutions />} />
          <Route path="/help" element={<Static.HelpCenter />} />
          <Route path="/terms" element={<Static.TermsConditions />} />
          <Route path="/privacy" element={<Static.PrivacyPolicy />} />
          <Route path="/cookies" element={<Static.CookiePolicy />} />
          <Route path="/contact" element={<Static.Contact />} />

          {/* Fallbacks */}
          <Route path="*" element={
            <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center">
              <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
              <p className="text-xl text-slate-500 mb-8">The page you are looking for does not exist.</p>
              <a href="/" className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold">Back Home</a>
            </div>
          } />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
