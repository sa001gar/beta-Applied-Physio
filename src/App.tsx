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
      <Suspense fallback={<Loader size="large" />}>
        {children}
      </Suspense>
    </main>
    <Footer />
    <ChatBot />
    
    {/* Floating WhatsApp Widget */}
    <a
      href="https://wa.me/919808163749"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA56] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.507 0 9.961-4.45 9.964-9.943.001-2.661-1.034-5.163-2.912-7.04C16.48 1.745 13.975.755 11.3.755 5.795.755 1.34 5.205 1.336 10.697c-.001 1.547.416 3.053 1.21 4.398l-1.077 3.935 4.024-1.054.154.092zM17.51 14.88c-.288-.144-1.699-.838-1.961-.933-.264-.096-.456-.144-.648.144-.192.288-.744.933-.912 1.123-.168.192-.336.216-.624.072-.288-.144-1.217-.449-2.32-1.433-.858-.766-1.438-1.712-1.606-2-.168-.288-.018-.444.126-.587.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.232-.56-.464-.48-.648-.488-.168-.008-.36-.008-.552-.008-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.032 3.104 4.92 4.352.688.296 1.224.472 1.64.608.696.224 1.328.192 1.832.12.56-.08 1.7-.696 1.936-1.368.24-.672.24-1.248.168-1.368-.072-.12-.264-.192-.552-.336z"/>
      </svg>
    </a>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;