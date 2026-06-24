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
      <nav className="flex text-xs md:text-sm" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 md:gap-2">
          <li className="flex items-center">
            <Link to="/" className={`inline-flex items-center transition-colors ${textSecondary}`}>
              <Home className="w-3.5 h-3.5 mr-1 md:mr-1.5 flex-shrink-0" />
              <span>Home</span>
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
               <li key={path} className="flex items-center min-w-0">
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${iconColor}`} />
                  {isLast ? (
                    <span 
                      className={`font-semibold capitalize ${textPrimary} truncate max-w-[120px] sm:max-w-[250px] md:max-w-[450px] lg:max-w-[700px] xl:max-w-none inline-block align-middle`}
                      title={pageName || segment.replace(/-/g, ' ')}
                    >
                      {pageName || segment.replace(/-/g, ' ')}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className={`transition-colors capitalize ${textSecondary} truncate max-w-[100px] sm:max-w-none inline-block align-middle`}
                    >
                      {segment.replace(/-/g, ' ')}
                    </Link>
                  )}
                </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;