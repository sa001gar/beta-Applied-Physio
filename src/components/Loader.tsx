interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

const Loader = ({ size = 'medium' }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full border-4 border-t-green-500 border-b-green-700 border-l-green-600 border-r-green-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;