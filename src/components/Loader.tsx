interface LoaderProps {
  variant?: 'splash' | 'progress' | 'inline';
  size?: 'small' | 'medium' | 'large';
  isFadingOut?: boolean;
}

const Loader = ({ variant = 'progress', isFadingOut = false }: LoaderProps) => {
  if (variant === 'splash') {
    return (
      <div className={`fixed inset-0 z-[9999] bg-gradient-to-b from-[#0b3c25] to-[#062416] flex flex-col justify-center items-center ${isFadingOut ? 'animate-splash-fade-out pointer-events-none' : ''}`}>
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse">
          <img 
            src="/images/layout/logo_final.png" 
            alt="Applied Physio Logo" 
            className="h-20 md:h-24 w-auto object-contain brightness-0 invert"
          />
        </div>
        
        {/* Horizontal progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-emerald-400 rounded-full ${isFadingOut ? 'w-full' : 'animate-progress-fill'}`} />
        </div>
      </div>
    );
  }

  if (variant === 'progress') {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-emerald-950/20 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-1/3 animate-progress-loop" />
      </div>
    );
  }

  // Inline loader for list/detail page loads, replacing spinner
  return (
    <div className="w-full max-w-xs mx-auto py-8">
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-1/3 animate-progress-loop" />
      </div>
    </div>
  );
};

export default Loader;