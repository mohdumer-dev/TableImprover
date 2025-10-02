
import { useContext, useEffect, useRef, useState } from "react";
import IsSession from "../context";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import getData from "../functions/getData.js";
import GradientButton from "../components/GradientButton.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import CompletedSection from "../components/completedSection.jsx";
import auLocal from "../functions/addLocal.js";


function Improver() {
   const questionId = localStorage.getItem("questionId");
  const [alreadyCompleted,setAlreadyComplete]=useState(false)
  const inputRef = useRef();
  const navigate = useNavigate();
  const timerRef = useRef();
  const [completed, setCompleted] = useState(false);
  const ses = localStorage.getItem("sessionId");
  const sessionId = useRef(ses);
  const isSession = useContext(IsSession);

  isSession.setIsSession(false);
  

  if(!sessionId.current  &&!questionId){

     navigate("/app/sessions")

  }

  const score = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/session/intialQuestions/` + sessionId.current);

  const [Score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [tableData, setTableData] = useState();
 
  async function onSumbit() {
    const currentScoreData = getData("EngineData", "score");
    const currentScore = currentScoreData !== null ? parseInt(currentScoreData) : 0;
    const questionId = localStorage.getItem("questionId");

    const res2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/session/checkQuestions`, {
      sessionId: sessionId.current,
      question: {
        table: tableData.table,
        multiplier: tableData.multiplier,
      },
      answer: inputVal,
    });

    if (res2.data.completed) {
      setCompleted(true)

      
    }

    if (res2.data.correct) {
      const prev = JSON.parse(localStorage.getItem("EngineData")) || { score: 0, time: 0 };
      const newScore = (currentScore !== null ? parseInt(currentScore) : 0) + 1;
      const newEn = { ...prev, score: newScore };
      localStorage.setItem("EngineData", JSON.stringify(newEn));
    
      setScore(newScore);
    }

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/session/getQuestions/` + questionId);
    const newScore = getData("EngineData", "score");

    setTableData(res.data);
   
    if(inputRef.current){
inputRef.current.focus();
    }
    
    setInputVal("");
  }

 

  // Timer

   

  useEffect(() => {

    
    
    timerRef.current = setInterval(() => {
      const prevTimeData = getData("EngineData", "time");
      const prevTime = prevTimeData !== null ? parseInt(prevTimeData) : 0;
      const prevEngine = JSON.parse(localStorage.getItem("EngineData")) || { score: 0, time: 0 };
      const newTime = prevTime + 1;
      const newEngine = { ...prevEngine, time: newTime };
      localStorage.setItem("EngineData", JSON.stringify(newEngine));
      setTime(newTime);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // EngineData setup
  useEffect(() => {
    const EngineData = localStorage.getItem("EngineData");
    if (!EngineData) {
      localStorage.setItem("EngineData", JSON.stringify({ score: 0, time: 0 }));
      setScore(0);
      setTime(0);
    } else {
      // Initialize score and time from localStorage with proper null checks
      const currentScore = getData("EngineData", "score");
      const currentTime = getData("EngineData", "time");
      setScore(currentScore !== null ? parseInt(currentScore) : 0);
      setTime(currentTime !== null ? parseInt(currentTime) : 0);
    }
  }, []);

  // Fetch first question
  useEffect(() => {

   
  if(!sessionId.current  &&!questionId){

    navigate("/app/sessions")

 }
    
    async function call() {
      const questionId = localStorage.getItem("questionId");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/session/getQuestions/` + questionId);
      setTableData(res.data);

      // Score is already set in the EngineData setup useEffect
      // const score = getData("EngineData", "score");
      // setScore(score);
    }
    call();
  }, []);

   //For extra things that you need to do in the mounting stage
   useEffect(()=>{

    // if(isSession.isSession){
    //   navigate("/app/sessions")
    // }


  
    setAlreadyComplete(JSON.parse(getData("UniData","completed")))
    // auLocal("UniData",'activeItem',"sessions")
  },[])

       const progress =
    score.data?.numberOfQuestions && score.data?.numberOfQuestions > 0
      ? (Score / score.data?.numberOfQuestions) * 100
      : 0;

   



    const handleKeyDown = (event) => {
      
    if (event.key === "Enter") {
      onSumbit()
    }
  };


  if (score.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex justify-center items-center">
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-12 text-center border border-purple-500/30">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-6"></div>
          <span className="text-2xl font-bold text-white">Loading...</span>
        </div>
      </div>
    );
  }

  if (completed ||  alreadyCompleted) {
    
    return <CompletedSection timerRef={timerRef} sessionId={sessionId} navigate={navigate} isSession={isSession} />;
  }

  // progress bar width
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-4 md:p-8 flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {/* Score + Time */}
        <div className="flex flex-col sm:flex-row justify-between bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-purple-500/30 gap-4 sm:gap-0">
          <p className="font-bold text-pink-400 text-xl md:text-2xl bg-gray-800 px-6 py-3 rounded-xl border border-pink-500/40 shadow-lg">
            Score {Score}/{score.data?.numberOfQuestions}
          </p>

          <p className="font-bold text-blue-400 text-xl md:text-2xl bg-gray-800 px-6 py-3 rounded-xl border border-blue-500/40 shadow-lg">
            Time: {time >= 60 ? `${Math.floor(time / 60)}m ${time % 60}s` : `${time}s`}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-4 shadow-inner border border-purple-500/30">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="flex justify-center bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 md:p-16 shadow-2xl border border-purple-500/30">
          {tableData ? (
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,0,255,0.6)]">
              {tableData.table} × {tableData.multiplier}
            </h2>
          ) : (
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-400 animate-pulse">Loading...</h2>
          )}
        </div>

        {/* Input */}
        <div className="flex justify-center">
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            type="number"
            onKeyDown={handleKeyDown}
            placeholder="Enter your Answer"
            className="w-80 px-4 py-3 rounded-xl text-center text-lg font-semibold shadow-xl border border-purple-400/40
                     bg-gray-900 text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <div className="transform hover:scale-110 transition-all duration-300">
            <GradientButton onClick={onSumbit}>Submit</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Improver;
