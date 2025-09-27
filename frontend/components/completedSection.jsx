import React, { useEffect } from "react";
import GradientButton from "../components/GradientButton.jsx";
import axios from "axios";
import getData from "../functions/getData.js";
import { useContext} from "react";
import IsSession from "../context.js";
import auLocal from "../functions/addLocal.js";



const CompletedSection = ({ timerRef, sessionId,  navigate }) => {
     const  isSession=useContext(IsSession)

  const time = getData("EngineData", "time");
  auLocal("UniData","completed","true")

  useEffect(() => {
    // clear the timer when component mounts
    if (timerRef && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [timerRef]);

  setTimeout(onComplete,10000)


  async function onComplete() {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/session/timeTaken",
        {
          timeTaken: time,
          sessionId: sessionId.current,
        }
      );

      console.log(res.data);
     

      // update session context

      const UniData=localStorage.getItem("UniData")

      localStorage.clear();

      localStorage.setItem("UniData",UniData)

      // navigate to sessions page
      navigate("/app/sessions");

    } catch (error) {
      console.error("Error completing session:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <span className="text-xl font-bold bg-purple-800 px-4 py-2 rounded">
        Session is completed
      </span>
      <GradientButton onClick={onComplete}>End Session</GradientButton>
    </div>
  );
};

export default CompletedSection;
