import React, { useState, useEffect } from 'react';

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to home page
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-white opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl font-bold text-white animate-pulse">
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 animate-fade-in-up">
          Oops! Page Not Found
        </h2>

        <p className="text-white/80 text-lg mb-8 leading-relaxed animate-fade-in-up delay-100">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Countdown Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 animate-fade-in-up delay-200">
          <div className="text-white/90 mb-2">
            Redirecting to home page in
          </div>
          <div className="text-4xl font-bold text-white">
            {countdown}
          </div>
          <div className="text-white/70 text-sm mt-1">
            seconds
          </div>
        </div>

        {/* Go Home Button */}
        <button
          onClick={handleGoHome}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out border-2 border-white/30 rounded-full hover:border-white hover:bg-white hover:text-purple-600 hover:scale-105 hover:shadow-xl animate-fade-in-up delay-300"
        >
          <span className="relative">
            Go Home Now
          </span>
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 transition-transform duration-300 group-hover:scale-100"></div>
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-white/5 rounded-full animate-float delay-500"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}