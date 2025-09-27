import React, { useState, useEffect } from 'react';

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="text-center max-w-lg mx-auto relative z-10 px-4">
        {/* Elegant 404 with glow effect */}
        <div className="relative mb-12">
          <h1 className="text-9xl md:text-[12rem] font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 leading-none tracking-tight">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-extralight text-white opacity-10 blur-sm">
            404
          </div>
        </div>

        {/* Error Message with fade-in animation */}
        <div className="space-y-4 mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            Lost in the void
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
            The page you're seeking has drifted into the digital abyss.
          </p>
        </div>

        {/* Elegant countdown with circular progress */}
        <div className="mb-12 animate-fade-in-delay">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (countdown / 5)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-light text-white">{countdown}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Returning home automatically
          </p>
        </div>

        {/* Beautiful button with subtle effects */}
        <button
          onClick={handleGoHome}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-light tracking-wide transition-all duration-300 ease-out animate-fade-in-delay-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 border border-gray-600 rounded-full group-hover:border-gray-400 transition-colors duration-300"></div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-full transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center space-x-2">
            <span>Take me home</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white opacity-30 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-white opacity-15 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-12 w-1 h-1 bg-white opacity-25 rounded-full animate-float"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.9s both;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float 4s ease-in-out infinite 1s;
        }

        .animate-float-delay-2 {
          animation: float 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}