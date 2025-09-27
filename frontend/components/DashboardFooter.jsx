

const DashboardFooter = () => {
  const handleDeveloperClick = () => {
    window.open('https://github.com/mohdumer-dev', '_blank');
  };

  const handleVerifierClick = () => {
    window.open('https://github.com/mohdumer-dev', '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-t border-gray-200/60 ">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-2 py-2 mt-2">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* Main content container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            
            {/* Developer Badge */}
            <div className="group flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Developed by</span>
              <div 
                onClick={handleDeveloperClick}
                className="relative cursor-pointer overflow-hidden"
              >
                {/* Main badge */}
                <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 group-hover:from-emerald-600 group-hover:to-green-600">
                  <span className="relative z-10">Mohd Wasif</span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  {/* Verified checkmark */}
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>

            {/* Elegant separator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Verifier Badge */}
            <div className="group flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Verified by</span>
              <div 
                onClick={handleVerifierClick}
                className="relative cursor-pointer overflow-hidden"
              >
                {/* Main badge */}
                <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-gray-900 px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 group-hover:from-amber-500 group-hover:to-orange-600">
                  <span className="relative z-10">Mohd Umer</span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  {/* Verified checkmark */}
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </div>

          {/* Additional info section */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span>Crafted with passion • Built for excellence</span>
          </div>

          {/* Floating particles for extra flair */}
          <div className="absolute top-4 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 right-16 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-8 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;