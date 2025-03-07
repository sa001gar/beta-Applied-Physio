import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
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
const Social = lazy(() => import('./pages/Social'));
const Features = lazy(() => import('./components/Features'));
const Testimonials = lazy(() => import('./components/Testimonials'));

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
  </div>
);

// Home page component
const Home = () => (
  <>
    <Hero />
    <Services />
    <Features />
    <Testimonials />
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
          <Route path="/social" element={<Social />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;