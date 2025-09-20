import { useContext, useEffect, useRef, useState } from "react";
import IsSession from "../context";
import DisplayText from "../components/displaytext";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import getData from "../functions/getData.js";
import GradientButton from "../components/GradientButton.jsx";

function Improver() {
  // Get session ID from localStorage (original logic)
  const ses = localStorage.getItem("sessionId");
  console.log(ses);
  
  const sessionId = useRef(ses);
  const isSession = useContext(IsSession);
  
  // API calls (original logic)
  const QuestionId = useFetch("http://localhost:3000/api/v1/session/generate/" + sessionId.current);
  const score = useFetch("http://localhost:3000/api/v1/session/stats/" + sessionId.current);
  
  // Initialize from localStorage (original logic)
  const initialScore = JSON.parse(localStorage.getItem("EngineData"))?.score || 0;
  const [Score, setScore] = useState(initialScore);
  
  const initialTime = JSON.parse(localStorage.getItem("EngineData"))?.time || 0;
  const [time, setTime] = useState(initialTime);
  
  const [inputVal, setInputVal] = useState("");
  const [tableData, setTableData] = useState();

  /**
   * Submit function - restored your exact original logic
   */
  async function onSubmit() {
    console.log("Submit is clicked");

    const currentScore = getData("EngineData", "score");
    const questionId = localStorage.getItem("questionId");
    
    const res = await axios.get("http://localhost:3000/api/v1/session/getQuestions/" + questionId);
    const res2 = await axios.post("http://localhost:3000/api/v1/session/checkQuestions", {
      sessionId: sessionId.current,
      question: {
        table: tableData.table,
        multiplier: tableData.multiplier
      },
      answer: inputVal
    });

    if (res2.data.correct) {
      const prev = JSON.parse(localStorage.getItem("EngineData"));
      const newEn = { ...prev, score: currentScore + 1 };
      localStorage.setItem("EngineData", JSON.stringify(newEn));
    }

    console.log(res.data.table + "this is res");

    const newScore = getData("EngineData", 'score');
    
    setTableData(res.data);
    setScore(newScore);
  }

  // Timer - your exact original logic
  useEffect(() => {
    const interval = setInterval(() => {
      const prevData = JSON.parse(localStorage.getItem("EngineData"));
      const newTime = prevData.time + 1;
      const newEngineData = { ...prevData, time: newTime };
      localStorage.setItem("EngineData", JSON.stringify(newEngineData));
      setTime(newTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Sets EngineData with better logging
  useEffect(() => {
    console.log("QuestionId.data changed:", QuestionId.data);
    
    if (QuestionId.data && QuestionId.data.message) {
      console.log("Setting questionId:", QuestionId.data.message);
      localStorage.setItem("questionId", QuestionId.data.message);
    }
    
    const EngineData = localStorage.getItem("EngineData");
    console.log("Current EngineData:", EngineData);
    
    if (!EngineData) {
      console.log("Creating new EngineData");
      localStorage.setItem("EngineData", JSON.stringify({"score": 0, 'time': 0}));
    }
  }, [QuestionId.data]);

  // Initialize component with error handling
  useEffect(() => {
    isSession.setIsSession(false);

    async function call() {
      try {
        const questionId = localStorage.getItem("questionId");
        console.log("Fetching question with ID:", questionId);
        
        if (!questionId) {
          console.log("No questionId found, waiting for QuestionId.data...");
          return;
        }
        
        const res = await axios.get("http://localhost:3000/api/v1/session/getQuestions/" + questionId);
        console.log("Question response:", res.data);
        setTableData(res.data);
        
        const score = getData("EngineData", "score");
        setScore(score);
      } catch (error) {
        console.error("Error in initialization:", error);
      }
    }

    call();
  }, []);

  // Debug logging
  console.log("QuestionId:", QuestionId);
  console.log("Score:", score);
  console.log("TableData:", tableData);

  // Loading state with better debugging
  if (QuestionId.loading || score.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="text-xl font-bold text-blue-600">Loading...</span>
          <div className="mt-4 text-sm text-gray-500">
            <p>QuestionId loading: {QuestionId.loading ? "Yes" : "No"}</p>
            <p>Score loading: {score.loading ? "Yes" : "No"}</p>
            <p>Session ID: {sessionId.current}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Stats header - cleaner version of your original */}
        <div className="flex text-xl justify-between mb-6 bg-white rounded-lg p-4 shadow-md"> 
          <p className="font-bold text-green-600 text-xl">
            Score {Score}/{score.data?.numberOfQuestions}
          </p>
          <p>Time: {time} sec</p>
        </div>

        {/* Question display - your original logic with better styling */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center mb-8">
            {tableData ? (
              <h2 className="text-8xl font-bold text-gray-800">
                {tableData.table} X {tableData.multiplier}
              </h2>
            ) : (
              <h2 className="text-8xl font-bold text-gray-400">Loading...</h2>
            )}
          </div>

          {/* Input field - your original with better styling */}
          <div className="flex justify-center mb-6">
            <input 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              type="number" 
              placeholder="Enter your Answer" 
              className="w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Submit button - your original onClick */}
          <div className="flex justify-center">
            <GradientButton onClick={onSubmit}>Submit</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Improver;