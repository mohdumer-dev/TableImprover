import React, { useState, useEffect } from "react";
import { Calculator, BarChart3, Target, Trophy, Zap, Shield, Users, Star, Brain, Clock, Award, BookOpen, TrendingUp, CheckCircle } from "lucide-react";
import { SignInButton, SignOutButton, useUser, SignIn } from "@clerk/clerk-react";
import LoadingScreen from "../components/LoadingScreen";

const NavBar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
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
                <span className="text-gray-700 font-medium">
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
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
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

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className={`${color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Home = () => {
  const { isSignedIn, isLoaded } = useUser();

  // Show loading immediately if user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = '/app/dashboard';
      }, 1000);
    }
  }, [isSignedIn, isLoaded]);

  // Show loading screen immediately if user is signed in
  if (isLoaded && isSignedIn) {
    return <LoadingScreen />;
  }

  const features = [
    {
      icon: Target,
      title: "Interactive Practice",
      description: "Practice multiplication tables with timed sessions and instant feedback on your answers.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed statistics and accuracy charts.",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Timed Sessions",
      description: "Challenge yourself with time-based practice sessions to improve speed and accuracy.",
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn achievements and track your learning milestones as you master each table.",
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Master
                </span>
                <br />
                <span className="text-gray-900">Multiplication Tables</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform your multiplication skills with interactive practice sessions, real-time progress tracking, and personalized learning paths.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isSignedIn ? (
                <button
                  onClick={() => navigate('/app/dashboard')}
                  className="group cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
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
                  <button className="group cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Start Learning</span>
                    <Brain className="h-5 w-5 group-hover:animate-pulse" />
                  </button>
                </SignInButton>
              )}
              <button className="bg-white/80 cursor-pointer backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-4xl font-bold">500K+</div>
              <div className="text-purple-100">Questions Answered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">25K+</div>
              <div className="text-purple-100">Students Learning</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">95%</div>
              <div className="text-purple-100">Improvement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to multiplication mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Choose Your Level</h3>
              <p className="text-gray-600">Select which multiplication tables you want to practice and set your difficulty level</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Practice & Learn</h3>
              <p className="text-gray-600">Answer questions in timed sessions with instant feedback and helpful hints</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Track Progress</h3>
              <p className="text-gray-600">Monitor your improvement with detailed analytics and celebrate your achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">MathMaster?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl w-fit mx-auto">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Smart Learning</h3>
              <p className="text-gray-600">Adaptive practice sessions that adjust to your skill level and learning pace</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl w-fit mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Proven Results</h3>
              <p className="text-gray-600">Track your progress with detailed analytics and see real improvement</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl w-fit mx-auto">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Complete Curriculum</h3>
              <p className="text-gray-600">Master all multiplication tables from 1x1 to 12x12 systematically</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Ready to Master Multiplication?
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of students who have improved their math skills with MathMaster
            </p>
            {isSignedIn ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>Go to Dashboard</span>
                <Calculator className="h-5 w-5" />
              </button>
            ) : (
              <SignInButton
                mode="modal"
                afterSignInUrl="/app/dashboard"
                afterSignUpUrl="/app/dashboard"
              >
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
                  <span>Start Learning Now</span>
                  <Brain className="h-5 w-5" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MathMaster
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} MathMaster. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;