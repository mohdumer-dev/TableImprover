import { useContext,useEffect, useRef, useState } from "react";
import IsSession from "../context";
import DisplayText from "../components/displaytext";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import getData from "../functions/getData.js";
import GradientButton from "../components/GradientButton.jsx";

function Improver(){
   const ses=  localStorage.getItem("sessionId")
   console.log(ses)
    const sessionId=useRef(ses)
    const  isSession=useContext(IsSession)
    const QuestionId=useFetch("http://localhost:3000/api/v1/session/generate/"+sessionId.current)
    const score =useFetch("http://localhost:3000/api/v1/session/stats/"+sessionId.current)
    const initialScore = JSON.parse(localStorage.getItem("EngineData"))?.score || 0;
const [Score, setScore] = useState(initialScore)
    const initialTime = JSON.parse(localStorage.getItem("EngineData"))?.time || 0;
const [time, setTime] = useState(initialTime)
    const [inputVal,setInputVal] = useState("")

    const [tableData,setTableData]=useState()
    
  



   async function onSumbit(){
    console.log("Sumbit is  clicked")

     const  currentScore= getData("EngineData","score")
   const questionId = localStorage.getItem("questionId")
     const res=await axios.get("http://localhost:3000/api/v1/session/getQuestions/"+questionId)
     const res2=await axios.post("http://localhost:3000/api/v1/session/checkQuestions",{
     sessionId: sessionId.current,
     question:{
      table:tableData.table,
      multiplier:tableData.multiplier
     },
     answer:inputVal

     })

     if(res2.data.correct){
      const prev = JSON.parse(localStorage.getItem("EngineData"))
const newEn = { ...prev, score: currentScore + 1 }
localStorage.setItem("EngineData", JSON.stringify(newEn))
     }

     console.log(res.data.table+"this is res")

    const newScore=getData("EngineData",'score')
   
     

     setTableData(res.data)

     setScore(newScore)


    }

   
    
    //Timer 
useEffect(() => {
  const interval = setInterval(() => {
    const prevData = JSON.parse(localStorage.getItem("EngineData")) ;
    const newTime = prevData.time + 1;
    const newEngineData = { ...prevData, time: newTime };
    localStorage.setItem("EngineData", JSON.stringify(newEngineData));
    setTime(newTime);
  }, 1000);
  return () => clearInterval(interval);
}, [])
    
//Sets  EngineData
useEffect(() => {
    if (QuestionId.data && QuestionId.data.message) {
        localStorage.setItem("questionId", QuestionId.data.message);
    }
    const  EngineData=localStorage.getItem("EngineData")

    if(!EngineData){
      localStorage.setItem("EngineData",JSON.stringify({"score":0,'time':0}))
    }
    
 
}, [QuestionId.data]);



    useEffect(()=>{
        isSession.setIsSession(false)

       async function call() {
         const questionId = localStorage.getItem("questionId")
     const res=await axios.get("http://localhost:3000/api/v1/session/getQuestions/"+questionId)
     setTableData(res.data)
   const score=  getData("EngineData","score")
     setScore(score)
       }

       call()
     
   

    },[])

      if (QuestionId.loading || score.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-bold text-blue-600">Loading...</span>
      </div>
    );
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
   value={inputVal}
   onChange={e=>setInputVal(e.target.value)}
    type="number" 
    placeholder="Enter your Answer" 
    class="w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm 
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