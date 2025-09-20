//User will be created in check but when the backend will need the stats they will have to hit  this endpoint

import express from "express";
import mongoose from "mongoose";
const StatsRouter= express.Router();
import {UserModel,StatsModel} from "../models.js"


StatsRouter.use(express.json())

StatsRouter.post("/getStats",async function (req,res) {

        const user=req.body.user
        console.log(user)
        const username=user.fullName
        const email=user.primaryEmailAddress.emailAddress

        const RealUser= await UserModel.findOne({email:email })

        const RealStats= await StatsModel.findOne({userId:RealUser})
        // use Thes variable in the frontend


        // const rightAnswers=RealStats.rightAnswers
        // const wrongAnswers=RealStats.wrongAnswers
        // const timeTaken=RealStats.timeTaken
        // const streak=RealStats.streak

        res.json({
            stats:RealStats
        })




    
})




export default StatsRouter;