import React, { useEffect,useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Card from "../components/cards";
import { data } from "react-router-dom";
import { CardExample } from "../components/cards";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const [res,setRes]=useState(null)

  useEffect(() => {
    if (!isLoaded || !user) return; // wait until Clerk is ready

    const User = {
      
    "primaryEmailAddress":{
        "emailAddress":user.primaryEmailAddress.emailAddress
    },
    "fullName": user.fullName


    };

    async function Getit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/stats/getStats",
          { user: User }
        );
        setRes(a=>response)
      } catch (err) {
        console.error("Backeng gives an to us Error:", err);
      }
    }

    Getit();
  }, [isLoaded, user]);

  if (!isLoaded || res===null) return <p>Loading user...</p>;

  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>
      <p>Welcome, {user.fullName}</p>
      <div className=" flex w-full flex-col gap-2 md:flex-row  ">
      <Card name={"Streak" }data={res.data.stats.streak} ></Card>
      <Card name={"Total Right Answers" }data={res.data.stats.rightAnswers}></Card>
      <Card name={"Total Wrong Answers" }data={res.data.stats.wrongAnswers}></Card>
      
      <Card name={"Total Time Taken" }data={res.data.stats.timeTaken}></Card>
      
      
      </div>
    </div>
  );
}

export default Dashboard;
