


import React, { useEffect, useState, useRef } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import useCheck from "../hooks/check.js";
import useFetch from "../hooks/useFetch.js";
import FuturisticSidebar from "../components/userNavBar.jsx"
import CircleButton from "../components/circleButton.jsx";
import QuestionInput from "../components/inputField.jsx"
import GradientButton from "../components/GradientButton.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import IsSession from "../context.js";

const Session = () => {
  localStorage.clear();
  const isSession = useContext(IsSession)
  isSession.setIsSession(true)
  const navigate = useNavigate()
  const [inputFieldQuestions, setInputFieldQuestions] = useState()
  const { user, isLoaded } = useUser();
  const [selectedTables, setSelectedTables] = useState([]);
  
  async function onclickHandler() {
    if (!user || !isLoaded) { return; }
    const User = {
      "primaryEmailAddress": {
        "emailAddress": user.primaryEmailAddress.emailAddress
      },
      "fullName": user.fullName
    };
    const res = await axios.post("http://localhost:3000/api/v1/session/create", { "user": User, "numberOfQuestions": inputFieldQuestions, "tables": selectedTables })
    console.log(res.data)
    localStorage.setItem("sessionId", res.data.sessionId);
    const QuestionId = await axios.get("http://localhost:3000/api/v1/session/generate/" + res.data.sessionId)
    localStorage.setItem('questionId', QuestionId.data.message)
    navigate("/app/sessions/improve")
  }

  // when a button is toggled
  const handleToggle = (number, isSelected) => {
    if (isSelected) {
      // add number to selected list
      setSelectedTables((prev) => [...prev, number]);
    } else {
      // remove number from selected list
      setSelectedTables((prev) => prev.filter((n) => n !== number));
    }
  };

  return (
    <div className="flex-1 -m-px bg-gradient-to-br p-0 rounded-xl from-slate-900 via-purple-900 to-slate-900 overflow-hidden  relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 h-full flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Glassmorphism card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8">
            
            {/* Header section */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                Create Your Session
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Configure your learning session with custom questions and topics
              </p>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
              
              {/* Left section - Questions input */}
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">#</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">Questions</h3>
                  </div>
                  <QuestionInput onChange={setInputFieldQuestions} />
                  
                  {/* Selected count display */}
                  <div className="mt-3 p-2 bg-white/5 rounded-md border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Selected Tables:</span>
                      <span className="text-white font-medium">{selectedTables.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center section - Table selection */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-white">Select Tables</h3>
                  </div>
                  
                  {/* Responsive grid for circle buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-1.5 sm:gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i + 1} className="flex justify-center">
                        <CircleButton number={i + 1} onToggle={handleToggle} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right section - Action button and info */}
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-white">Ready to Start?</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <GradientButton onClick={onclickHandler} className="w-full">
                      Start Your Session
                    </GradientButton>
                    
                    {/* Session info */}
                    <div className="space-y-1.5 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>Questions: {inputFieldQuestions || 'Not set'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        <span>Tables: {selectedTables.length} selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${inputFieldQuestions && selectedTables.length ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span>Status: {inputFieldQuestions && selectedTables.length ? 'Ready' : 'Incomplete'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Session