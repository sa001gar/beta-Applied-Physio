import { Home, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  // Get the current route path segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex text-gray-700 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-green-700 hover:text-green-600 transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={path}>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-gray-500 mx-2" />
                  {isLast ? (
                    <span className="text-green-800 font-medium capitalize">
                      {pageName || segment}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className="text-green-700 hover:text-green-600 transition-colors capitalize"
                    >
                      {segment}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;