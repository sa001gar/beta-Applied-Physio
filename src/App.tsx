import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './lib/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Lazy load components with preload
const Services = lazy(() => import('./components/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));
const Login = lazy(() => import('./pages/Login'));
const Social = lazy(() => import('./pages/Social'));
const Features = lazy(() => import('./components/Features'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Stats = lazy(() => import('./components/Stats'));
const ConditionsWeTreat = lazy(() => import('./components/ConditionsWeTreat'));
const OurExperts = lazy(() => import('./components/OurExperts'));
const RecoveryJourney = lazy(() => import('./components/RecoveryJourney'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const FaqSection = lazy(() => import('./components/FaqSection'));

// Legal pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const MedicalDisclaimer = lazy(() => import('./pages/MedicalDisclaimer'));
const WebsiteDisclaimer = lazy(() => import('./pages/WebsiteDisclaimer'));
// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component for consistent page structure
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="flex-grow">
      <Suspense fallback={<Loader variant="progress" />}>
        {children}
      </Suspense>
    </main>
    <Footer />
    <ChatBot />


  </div>
);

// Home page component
const Home = () => (
  <>
    <Hero />
    <Stats />
    <ConditionsWeTreat />
    <Services />
    <Features />
    <OurExperts />
    <RecoveryJourney />
    <Testimonials />
    <BlogSection />
    <FaqSection />
  </>
);

// 404 Page
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] pt-32">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
      Go Home
    </Link>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/login" element={<Login />} />
            <Route
              path="/blog/admin"
              element={
                <ProtectedRoute>
                  <BlogAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="/social" element={<Social />} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
            <Route path="/website-disclaimer" element={<WebsiteDisclaimer />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;