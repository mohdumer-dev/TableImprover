import { useContext,useEffect, useRef, useState } from "react";

import IsSession from "../context";
import DisplayText from "../components/displaytext";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import getData from "../functions/getData.js";
import GradientButton from "../components/GradientButton.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import CompletedSection from "../components/completedSection.jsx";

function Improver(){
  const inputRef=useRef()
  const navigate=useNavigate()
  const timerRef=useRef()
  const [completed,setCompleted]=useState(false)
   const ses=  localStorage.getItem("sessionId")

    const sessionId=useRef(ses)
    const  isSession=useContext(IsSession)
    
    
   console.log("this is rerended")
   const score =useFetch("http://localhost:3000/api/v1/session/stats/"+sessionId.current)
   console.log("this is score  "+score)
  
   
    

const [Score, setScore] = useState(0)
const [time, setTime] = useState(0)
 const [inputVal,setInputVal] = useState("")
    const [tableData,setTableData]=useState()
    
  



   async function onSumbit(){
    console.log("Sumbit is  clicked")

  

   const  currentScore= getData("EngineData","score")//we get the score
   const questionId = localStorage.getItem("questionId")//get  the questionId
   
    
     const res2=await axios.post("http://localhost:3000/api/v1/session/checkQuestions",{
     sessionId: sessionId.current,
     question:{
      table:tableData.table,
      multiplier:tableData.multiplier
     },
     answer:inputVal

     })
     

     if(res2.data.completed){

      setCompleted(true)

     }

     if(res2.data.correct){
      const prev = JSON.parse(localStorage.getItem("EngineData"))
const newEn = { ...prev, score: currentScore + 1 }
localStorage.setItem("EngineData", JSON.stringify(newEn))
     }

      const res=await axios.get("http://localhost:3000/api/v1/session/getQuestions/"+questionId)

     console.log(res.data+"this is res")

    const newScore=getData("EngineData",'score')
   
     

     setTableData(res.data)

     setScore(newScore)

     inputRef.current.focus()

     setInputVal("")


    }

   
    
    //Timer 
useEffect(() => {
   timerRef.current = setInterval(() => {
    const  prevTime=parseInt(getData("EngineData","time"))
    const prevEngine=JSON.parse(localStorage.getItem("EngineData"))
    const newTime=prevTime+1
    const newEngine={...prevEngine,time:newTime}
    localStorage.setItem("EngineData",JSON.stringify(newEngine))

    

    setTime(getData("EngineData","time"))





    
  }, 1000);
  return () => clearInterval(timerRef.current);
}, [])
    
//Sets  EngineData
useEffect(() => {


    const  EngineData=localStorage.getItem("EngineData")

    if(!EngineData){
      localStorage.setItem("EngineData",JSON.stringify({"score":0,'time':0}))
    }
    
 
}, []);



    useEffect(()=>{
        isSession.setIsSession(false)

       async function call() {
         const questionId = localStorage.getItem("questionId")
            console.log("this is rerended this  is rerendered"+questionId
      
            )
     const res=await axios.get("http://localhost:3000/api/v1/session/getQuestions/"+questionId)
     setTableData(res.data)
   const score=  getData("EngineData","score")
     setScore(score)
       }

       call()
     
   

    },[])

      if ( score.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-bold text-blue-600">Loading...</span>
      </div>
    );
    
    
    
  }
  if (completed) {
   return <CompletedSection timerRef={timerRef} sessionId={sessionId} navigate={navigate} isSession={isSession}></CompletedSection>
    
    
  }
      
    return<div className="flex flex-col gap-3">
    <div  className="flex text-xl justify-between"> <p className="bold text-green-600 text-xl ">
  Score {Score}/{score.data?.numberOfQuestions}

</p>

<p>Time : {time} sec</p>
 </div>

 <div className="flex justify-center">
 {tableData?<h2 className="text-8xl font-bold">{tableData.table} X {tableData.multiplier}</h2>:<h2 className="text-8xl font-bold">Loading...</h2>} 
 </div>

  <div className="flex justify-center">
   <input 
   ref={inputRef}
   value={inputVal}
   onChange={e=>setInputVal(e.target.value)}
    type="number" 
    placeholder="Enter your Answer" 
    className="w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500 text-gray-700 placeholder-gray-400"
  />
 </div>

<div className="flex justify-center">
  <GradientButton onClick={onSumbit}>Submit</GradientButton>
</div>


    </div>
}

export   default Improver