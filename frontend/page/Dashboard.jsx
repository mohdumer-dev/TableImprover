
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import DashboardFooter from "../components/DashboardFooter";
import auLocal from "../functions/addLocal";
import getData from "../functions/getData";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!getData("UniData","activeItem")){
      localStorage.setItem("UniData","{}")
    }
   

    auLocal("UniData",'activeItem',"dashboard")
    



    if (!isLoaded || !user) return; // wait until Clerk is ready

    const User = {
      "primaryEmailAddress": {
        "emailAddress": user.primaryEmailAddress.emailAddress
      },
      "fullName": user.fullName
    };

    async function Getit() {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/v1/stats/getStats",
          { user: User }
        );
        setRes(response);
        setError(null);
      } catch (err) {
        console.error("Backend gives an error:", err);
        setError("Failed to load stats. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    Getit();
  }, [isLoaded, user]);

  // Loading state
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-medium">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              Welcome back, <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 px-3 py-1 rounded-full font-bold shadow-lg">{user.fullName}</span>
            </p>
            <div className="mt-4 hidden sm:block">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your performance overview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Custom Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Streak Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Current Streak</h3>
            <p className="text-3xl font-bold text-gray-900">{res?.data?.stats?.streak || 0}</p>
            <p className="text-sm text-gray-500 mt-2">days in a row</p>
          </div>

          {/* Right Answers Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Right Answers</h3>
            <p className="text-3xl font-bold text-gray-900">{res?.data?.stats?.rightAnswers || 0}</p>
            <p className="text-sm text-gray-500 mt-2">correct responses</p>
          </div>

          {/* Wrong Answers Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Wrong Answers</h3>
            <p className="text-3xl font-bold text-gray-900">{res?.data?.stats?.wrongAnswers || 0}</p>
            <p className="text-sm text-gray-500 mt-2">learning opportunities</p>
          </div>

          {/* Time Taken Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Time Taken</h3>
            <p className="text-3xl font-bold text-gray-900">{res?.data?.stats?.timeTaken ? `${Math.round(res.data.stats.timeTaken / 60)}m` : '0m'}</p>
            <p className="text-sm text-gray-500 mt-2">time invested</p>
          </div>
        </div>

       

        {/* Accuracy and Correct Answers Graph */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Performance Analytics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visual representation of your accuracy and correct answers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accuracy Progress Ring */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Accuracy Rate</h3>
              <div className="relative inline-flex items-center justify-center">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - (res?.data?.stats?.rightAnswers && res?.data?.stats?.wrongAnswers 
                      ? (res.data.stats.rightAnswers / (res.data.stats.rightAnswers + res.data.stats.wrongAnswers))
                      : 0))}`}
                    className="text-green-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {res?.data?.stats?.rightAnswers && res?.data?.stats?.wrongAnswers 
                        ? Math.round((res.data.stats.rightAnswers / (res.data.stats.rightAnswers + res.data.stats.wrongAnswers)) * 100)
                        : 0}%
                    </div>
                    <div className="text-sm text-gray-500">accurate</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                {res?.data?.stats?.rightAnswers || 0} correct out of {(res?.data?.stats?.rightAnswers || 0) + (res?.data?.stats?.wrongAnswers || 0)} total
              </div>
            </div>

            {/* Correct Answers Bar Chart */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Answer Distribution</h3>
              <div className="space-y-4">
                {/* Correct Answers Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-20">Correct</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                        style={{
                          width: `${res?.data?.stats?.rightAnswers && ((res?.data?.stats?.rightAnswers || 0) + (res?.data?.stats?.wrongAnswers || 0)) > 0
                            ? (res.data.stats.rightAnswers / ((res.data.stats.rightAnswers || 0) + (res.data.stats.wrongAnswers || 0))) * 100
                            : 0}%`
                        }}
                      >
                        <span className="text-xs font-bold text-white">
                          {res?.data?.stats?.rightAnswers || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wrong Answers Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-20">Wrong</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-400 to-red-600 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                        style={{
                          width: `${res?.data?.stats?.wrongAnswers && ((res?.data?.stats?.rightAnswers || 0) + (res?.data?.stats?.wrongAnswers || 0)) > 0
                            ? (res.data.stats.wrongAnswers / ((res.data.stats.rightAnswers || 0) + (res.data.stats.wrongAnswers || 0))) * 100
                            : 0}%`
                        }}
                      >
                        <span className="text-xs font-bold text-white">
                          {res?.data?.stats?.wrongAnswers || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Correct Answers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Wrong Answers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* Additional Stats Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Performance Summary
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track your progress and see how you're improving over time
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                {res?.data?.stats?.rightAnswers && res?.data?.stats?.wrongAnswers 
                  ? Math.round((res.data.stats.rightAnswers / (res.data.stats.rightAnswers + res.data.stats.wrongAnswers)) * 100)
                  : 0}%
              </div>
              <div className="text-sm text-green-700 font-medium">Accuracy</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                {(res?.data?.stats?.rightAnswers || 0) + (res?.data?.stats?.wrongAnswers || 0)}
              </div>
              <div className="text-sm text-blue-700 font-medium">Total Questions</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-100">
              <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
                {res?.data?.stats?.wrongAnswers || 0}
              </div>
              <div className="text-sm text-red-700 font-medium">Wrong Questions</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                {res?.data?.stats?.rightAnswers && res?.data?.stats?.wrongAnswers 
                  ? Math.round(((res.data.stats.wrongAnswers) / (res.data.stats.rightAnswers + res.data.stats.wrongAnswers)) * 100)
                  : 0}%
              </div>
              <div className="text-sm text-orange-700 font-medium">Inaccuracy</div>
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Keep up the great work!
            </h3>
            <p className="text-indigo-100 max-w-2xl mx-auto">
              {res?.data?.stats?.streak > 0 
                ? `You're on a ${res.data.stats.streak} day streak! Stay consistent to reach new heights.`
                : "Start your learning journey today and build your streak!"
              }
            </p>
          </div>
        </div>

       
      
      </div>
       {/* Footer Developer */}
       <div className="mb-0  p-0 "> <DashboardFooter/></div>
    </div>
  );
}

export default Dashboard;