import { Home, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  pageName?: string;
  theme?: 'light' | 'dark';
}

const Breadcrumb = ({ pageName, theme = 'light' }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  // Get the current route path segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const textPrimary = theme === 'dark' ? 'text-emerald-50' : 'text-green-800';
  const textSecondary = theme === 'dark' ? 'text-emerald-100/70 hover:text-white' : 'text-green-700 hover:text-green-600';
  const iconColor = theme === 'dark' ? 'text-emerald-100/50' : 'text-gray-500';

  return (
    <div className="w-full pb-6 z-20 relative">
      <nav className="flex text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className={`inline-flex items-center transition-colors ${textSecondary}`}>
              <Home className="w-4 h-4 mr-1.5" />
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
               <li key={path}>
                <div className="flex items-center">
                  <ChevronRight className={`w-4 h-4 mx-1 md:mx-2 ${iconColor}`} />
                  {isLast ? (
                    <span className={`font-semibold capitalize ${textPrimary}`}>
                      {pageName || segment.replace(/-/g, ' ')}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className={`transition-colors capitalize ${textSecondary}`}
                    >
                      {segment.replace(/-/g, ' ')}
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