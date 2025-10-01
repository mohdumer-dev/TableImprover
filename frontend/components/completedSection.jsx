
import React, { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton.jsx";
import axios from "axios";
import getData from "../functions/getData.js";
import { useContext } from "react";
import IsSession from "../context.js";
import auLocal from "../functions/addLocal.js";
import { 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  AlertCircle,
  X,
  Trophy,
  Target,
  Sparkles
} from "lucide-react";

const CompletedSection = ({ timerRef, sessionId, navigate }) => {
  const isSession = useContext(IsSession);
  const [stats, setStats] = useState(null);
  const [showMistakesModal, setShowMistakesModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const time = getData("EngineData", "time");
  auLocal("UniData", "completed", "true");

  useEffect(() => {
    // clear the timer when component mounts
    if (timerRef && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [timerRef]);

  useEffect(() => {
    // Fetch stats when component mounts
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/session/getStats/${sessionId.current}`
      );
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  async function onComplete() {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/session/timeTaken/`,
        {
          timeTaken: time,
          sessionId: sessionId.current,
        }
      );

      console.log(res.data);

      // update session context
      const UniData = localStorage.getItem("UniData");
      localStorage.clear();
      localStorage.setItem("UniData", UniData);

      // navigate to sessions page
      navigate("/app/sessions");
    } catch (error) {
      console.error("Error completing session:", error);
    }
  }

  const accuracy = stats && stats.numberOfQuestionsDone > 0 
    ? ((stats.rightAnswers / stats.numberOfQuestionsDone) * 100).toFixed(1)
    : 0;

  const wrongQuestions = stats?.questions?.filter(q => !q.correct) || [];

  // If showing mistakes, render the mistakes component instead
  if (showMistakesModal) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 via-blue-500 to-cyan-400"></div>

        {/* Mistakes Review Component */}
        <div className="relative z-10 p-3 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden animate-slide-up-modal shadow-2xl border border-gray-700">
              {/* Header - RED themed */}
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 p-4 sm:p-5 md:p-6 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-slide-shimmer"></div>
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-0 sm:mb-1 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    Your Mistakes
                  </h2>
                  <p className="text-red-100 text-xs sm:text-sm">Review and learn from these questions</p>
                </div>
                <button
                  onClick={() => setShowMistakesModal(false)}
                  className="relative z-10 text-white hover:bg-white/20 rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="p-3 sm:p-4 md:p-6 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto">
                {wrongQuestions.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {wrongQuestions.map((question, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="mb-3 sm:mb-4">
                          <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-md sm:rounded-lg mb-2 sm:mb-3 shadow-md">
                            Question {index + 1}
                          </span>
                          <p className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                            {question.table} × {question.multiplier} = ?
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-green-500/40 shadow-inner">
                          <p className="text-green-400 text-xs sm:text-sm mb-1 sm:mb-2 font-semibold flex items-center gap-1 sm:gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            Correct Answer:
                          </p>
                          <p className="text-white font-black text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                            {question.table * question.multiplier}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8 text-sm sm:text-base">
                    No mistakes to review - Perfect score!
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-800/80 backdrop-blur p-3 sm:p-4 flex justify-between items-center border-t border-gray-700">
                <button
                  onClick={() => setShowMistakesModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all font-bold text-sm sm:text-base shadow-lg"
                >
                  ← Back to Stats
                </button>
                <button
                  onClick={onComplete}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all font-bold text-sm sm:text-base shadow-lg hover:shadow-purple-500/50"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main stats view
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 via-blue-500 to-cyan-400"></div>

      {/* Content */}
      <div className="relative z-10 p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Completion Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-lg rounded-full mb-4 shadow-2xl animate-bounce-slow border-4 border-white/30">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-2xl">
              Session Completed!
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl flex flex-wrap items-center justify-center gap-2 drop-shadow-lg px-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              Great job! Here's how you performed
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </p>
          </div>

          {/* Stats Grid with proper colors */}
          {!loading && stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 animate-slide-up">
              {/* Accuracy Card - Keep Purple/Blue */}
              <div className="group bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/30 border border-white/30">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-2">
                  <Target className="w-8 h-8 sm:w-10 sm:h-10 opacity-90 group-hover:rotate-12 transition-transform drop-shadow-lg" />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
                    {accuracy}%
                  </span>
                </div>
                <p className="text-white/90 font-bold tracking-wide text-sm sm:text-base lg:text-lg text-center sm:text-left">Accuracy</p>
              </div>

              {/* Correct Answers - GREEN */}
              <div className="group bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-400/30 border border-green-400/50">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-2">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-300 opacity-90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-green-300 drop-shadow-lg">
                    {stats.rightAnswers}
                  </span>
                </div>
                <p className="text-green-200 font-bold tracking-wide text-sm sm:text-base lg:text-lg text-center sm:text-left">Correct</p>
              </div>

              {/* Wrong Answers - RED */}
              <div className="group bg-gradient-to-br from-red-500/30 to-rose-500/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-red-400/30 border border-red-400/50">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-2">
                  <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-300 opacity-90 group-hover:rotate-180 transition-transform duration-500 drop-shadow-lg" />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-red-300 drop-shadow-lg">
                    {stats.wrongAnswers}
                  </span>
                </div>
                <p className="text-red-200 font-bold tracking-wide text-sm sm:text-base lg:text-lg text-center sm:text-left">Incorrect</p>
              </div>

              {/* Total Questions - Keep Blue */}
              <div className="group bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/30 border border-white/30">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-2">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 opacity-90 group-hover:translate-y-[-4px] transition-transform drop-shadow-lg" />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
                    {stats.numberOfQuestionsDone}
                  </span>
                </div>
                <p className="text-white/90 font-bold tracking-wide text-sm sm:text-base lg:text-lg text-center sm:text-left">Total</p>
              </div>
            </div>
          )}

          {/* Performance Bar */}
          {!loading && stats && (
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 shadow-2xl border border-white/30 animate-fade-in-delayed">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-4 flex items-center gap-2 drop-shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                Overall Performance
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="bg-white/30 rounded-full h-6 sm:h-8 overflow-hidden shadow-inner border border-white/40">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-full transition-all duration-1000 ease-out shadow-lg relative"
                      style={{ width: `${accuracy}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-slide-shimmer"></div>
                    </div>
                  </div>
                </div>
                <span className="text-white font-black text-xl sm:text-2xl md:text-3xl drop-shadow-lg">
                  {accuracy}%
                </span>
              </div>
            </div>
          )}

          {/* Show Mistakes Button - RED themed */}
          {stats && wrongQuestions.length > 0 && (
            <div 
              onClick={() => setShowMistakesModal(true)}
              className="group bg-gradient-to-r from-red-500/30 to-rose-500/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 cursor-pointer hover:shadow-2xl hover:shadow-red-400/30 transition-all duration-300 transform hover:scale-[1.02] border border-red-400/50"
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-red-500/30 p-2 sm:p-3 rounded-xl sm:rounded-2xl group-hover:rotate-12 transition-transform">
                    <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-300 drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-red-100 drop-shadow-lg">Review Your Mistakes</h3>
                    <p className="text-red-200 text-sm sm:text-base md:text-lg drop-shadow">
                      Click to see {wrongQuestions.length} incorrect {wrongQuestions.length === 1 ? 'answer' : 'answers'}
                    </p>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl md:text-4xl text-red-200 group-hover:translate-x-2 transition-transform drop-shadow-lg">→</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center items-center animate-fade-in-delayed">
            <GradientButton onClick={onComplete}>End Session</GradientButton>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-modal {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .animate-slide-up-modal {
          animation: slide-up-modal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-slide-shimmer {
          animation: slide-shimmer 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompletedSection;