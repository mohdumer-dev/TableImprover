
import React, { useState, useEffect } from "react";
import { Calculator, BarChart3, Target, Trophy, Zap, Shield, Users, Star, Brain, Clock, Award, BookOpen, TrendingUp, CheckCircle } from "lucide-react";
import { SignInButton, SignOutButton, useUser, SignIn } from "@clerk/clerk-react";
import LoadingScreen from "../components/LoadingScreen";

const NavBar = () => {
  const { isSignedIn, user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MathMaster
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className={`font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                  Hello, {user.firstName || user.username || 'User'}!
                </span>
                <SignOutButton>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton
                mode="modal"
                afterSignInUrl="/app/dashboard"
                afterSignUpUrl="/app/dashboard"
                appearance={{
                  elements: {
                    footer: 'hidden'
                  }
                }}>
                <button className="bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Login
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Animated Number Component
const AnimatedNumber = ({ value, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`animated-number-${value}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  return <span id={`animated-number-${value}`}>{count.toLocaleString()}{suffix}</span>;
};

// Floating Math Elements
const FloatingMathElements = () => {
  const mathElements = ['2×3=6', '7×8=56', '9×4=36', '5×6=30', '12×7=84', '3×9=27'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {mathElements.map((element, index) => (
        <div
          key={index}
          className="absolute text-purple-300/30 font-bold text-lg animate-bounce"
          style={{
            left: `${10 + (index * 15)}%`,
            top: `${20 + (index * 10)}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + (index % 3)}s`
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, image }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="relative z-10">
        <div className={`${color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const { isSignedIn, isLoaded } = useUser();

  // Show loading immediately if user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setTimeout(() => {
        window.location.href = '/app/dashboard';
      }, 1000);
    }
  }, [isSignedIn, isLoaded]);

  if (isLoaded && isSignedIn) {
    return <LoadingScreen />;
  }

  const features = [
    {
      icon: Target,
      title: "Interactive Practice",
      description: "Practice multiplication tables with timed sessions and instant feedback on your answers.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed statistics and accuracy charts.",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    },
    {
      icon: Clock,
      title: "Timed Sessions",
      description: "Challenge yourself with time-based practice sessions to improve speed and accuracy.",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn achievements and track your learning milestones as you master each table.",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <NavBar />

    {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-12 lg:pt-0">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Math Elements - hidden on mobile */}
        <div className="hidden md:block">
          <FloatingMathElements />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32 w-full">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Hero Image First on Mobile */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-white/20">
                <img 
                  src="https://www.gveisrinagar.com/wp-content/uploads/2025/06/39b35697-1737-4301-8da5-effff02b74e8-scaled.jpg" 
                  alt="Students learning math"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-3 rounded-2xl shadow-lg animate-bounce">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Master
                  </span>
                  <br />
                  <span className="text-white">Multiplication</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Tables
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed px-4">
                  Transform your multiplication skills with interactive practice sessions, real-time progress tracking, and personalized learning paths.
                </p>
              </div>

              <div className="flex flex-col gap-3 px-4">
                {isSignedIn ? (
                  <button
                    onClick={() => window.location.href = '/app/dashboard'}
                    className="group cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl text-base font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <Calculator className="h-5 w-5 group-hover:animate-pulse" />
                  </button>
                ) : (
                  <SignInButton
                    mode="modal"
                    afterSignInUrl="/app/dashboard"
                    afterSignUpUrl="/app/dashboard"
                  >
                    <button className="group cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl text-base font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Start Learning</span>
                      <Brain className="h-5 w-5 group-hover:animate-pulse" />
                    </button>
                  </SignInButton>
                )}
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl text-base font-semibold border border-white/20 hover:bg-white/20 hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl xl:text-7xl font-extrabold">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Master
                  </span>
                  <br />
                  <span className="text-white">Multiplication</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Tables
                  </span>
                </h1>
                <p className="text-xl xl:text-2xl text-gray-300 leading-relaxed">
                  Transform your multiplication skills with interactive practice sessions, real-time progress tracking, and personalized learning paths.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <button
                    onClick={() => window.location.href = '/app/dashboard'}
                    className="group cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <Calculator className="h-5 w-5 group-hover:animate-pulse" />
                  </button>
                ) : (
                  <SignInButton
                    mode="modal"
                    afterSignInUrl="/app/dashboard"
                    afterSignUpUrl="/app/dashboard"
                  >
                    <button className="group cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Start Learning</span>
                      <Brain className="h-5 w-5 group-hover:animate-pulse" />
                    </button>
                  </SignInButton>
                )}
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-lg font-semibold border border-white/20 hover:bg-white/20 hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img 
                  src="https://www.gveisrinagar.com/wp-content/uploads/2025/06/39b35697-1737-4301-8da5-effff02b74e8-scaled.jpg" 
                  alt="Students learning math"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl shadow-lg animate-bounce">
                  <Star className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Learning Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to master multiplication tables with confidence and speed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Numbers */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?w=1200" 
            alt="Math background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white">
                <AnimatedNumber value={10000} suffix="+" />
              </div>
              <div className="text-blue-100 font-medium">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white">
                <AnimatedNumber value={144} />
              </div>
              <div className="text-blue-100 font-medium">Practice Problems</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white">
                <AnimatedNumber value={98} suffix="%" />
              </div>
              <div className="text-blue-100 font-medium">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white">
                <AnimatedNumber value={500000} suffix="+" />
              </div>
              <div className="text-blue-100 font-medium">Problems Solved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">MathMaster</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with proven learning techniques to make mastering multiplication fun and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
                <p className="text-gray-600">Personalized difficulty levels that adapt to your progress and learning pace.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Feedback</h3>
                <p className="text-gray-600">Instant correction and explanations help you learn from mistakes immediately.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl flex-shrink-0">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gamified Experience</h3>
                <p className="text-gray-600">Earn badges, achievements, and track streaks to stay motivated.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-600">Practice all tables from 1-12 with varying difficulty levels and question types.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Parent Dashboard</h3>
                <p className="text-gray-600">Track your child's progress with detailed insights and performance reports.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-xl flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed Training</h3>
                <p className="text-gray-600">Build quick recall with timed challenges and speed improvement tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Master Multiplication?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of students improving their math skills every day. Start your journey to multiplication mastery now!
            </p>
            {isSignedIn ? (
              <button
                onClick={() => window.location.href = '/app/dashboard'}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>Go to Dashboard</span>
                <Calculator className="h-6 w-6" />
              </button>
            ) : (
              <SignInButton
                mode="modal"
                afterSignInUrl="/app/dashboard"
                afterSignUpUrl="/app/dashboard"
              >
                <button className="bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
                  <span>Get Started Free</span>
                  <Brain className="h-6 w-6" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MathMaster</span>
              </div>
              <p className="text-sm text-gray-400">
                Making multiplication mastery fun and accessible for every student.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 MathMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
