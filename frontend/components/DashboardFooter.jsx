import React from 'react';

const DashboardFooter = () => {
  const handleDeveloperClick = () => {
    window.open('https://github.com/mohdumer-dev', '_blank');
  };

  const handleVerifierClick = () => {
    window.open('https://github.com/mohdumer-dev', '_blank');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
          <span>
            Developed by{' '}
            <span 
              onClick={handleDeveloperClick}
              className="relative cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-md font-bold hover:from-green-500 hover:to-green-600 transition-all duration-300 active:scale-95"
            >
              Mohd Wasif
              <svg 
                className="absolute -right-1 -top-1 w-4 h-4 text-green-700 opacity-80" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span>
            Verified by{' '}
            <span 
              onClick={handleVerifierClick}
              className="relative cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 px-2 py-1 rounded-md font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 active:scale-95"
            >
              Mohd Umer
              <svg 
                className="absolute -right-1 -top-1 w-4 h-4 text-yellow-700 opacity-80" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;