import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Simple Spinner */}
        <div className="w-16 h-16 mx-auto">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
