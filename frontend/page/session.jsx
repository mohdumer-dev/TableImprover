import React, { useEffect, useState,useRef } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import useCheck from "../hooks/check.js";
import useFetch from "../hooks/useFetch.js";
import FuturisticSidebar from "../components/userNavBar.jsx"
import CircleButton from "../components/circleButton.jsx";
import QuestionInput from "../components/inputField.jsx"
import GradientButton from "../components/GradientButton.jsx";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import IsSession from "../context.js";

const Session = () => {

  const  isSession=useContext(IsSession)
  isSession.setIsSession(true)
  const navigate=useNavigate()

  const [inputFieldQuestions,setInputFieldQuestions]=useState()

   const { user, isLoaded } = useUser();
  

  const [selectedTables, setSelectedTables] = useState([]);



async  function onclickHandler(){
  if(!user||!isLoaded){return ;}

    const User = {
      
    "primaryEmailAddress":{
        "emailAddress":user.primaryEmailAddress.emailAddress
    },
    "fullName": user.fullName


    };

  
  const res=await axios.post("http://localhost:3000/api/v1/session/create",{"user":User,"numberOfQuestions":inputFieldQuestions,"tables":selectedTables})

  console.log(res.data)

  localStorage.setItem("sessionId", res.data.sessionId);

  const QuestionId=await axios.get("http://localhost:3000/api/v1/session/generate/"+res.data.sessionId)
  localStorage.setItem('questionId',QuestionId.data.message)

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
     <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col gap-6 max-w-3xl w-full items-center">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Create Your Session
        </h3>

        {/* Number of Questions */}
        <div className="max-w-sm w-full">
          <QuestionInput onChange={setInputFieldQuestions} />
        </div>

        {/* Circle Buttons */}
        <div
          className="
            grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6
            gap-2 sm:gap-3 md:gap-4 w-full place-items-center
          "
        >
          {Array.from({ length: 12 }, (_, i) => (
            <CircleButton key={i + 1} number={i + 1} onToggle={handleToggle} />
          ))}
        </div>

        <GradientButton onClick={onclickHandler}>Start your Session</GradientButton>
            
      </div>
    </div>

  )
}


export default Session