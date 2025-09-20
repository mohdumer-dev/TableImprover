import express from "express";
import mongoose from "mongoose";
const Authrouter = express.Router();
import {UserModel,StatsModel} from "../models.js"




Authrouter.use(express.json())

Authrouter.post("/check", async (req, res) => {
    console.log("They hited me")
    const user=req.body.user
    const username=user.fullName
    const email=user.primaryEmailAddress.emailAddress

    console.log(email)

    const exists= await UserModel.findOne({email:email})

    console.log(exists)

    if(exists){
        res.json({
            message:"user already exists"
        })
    }else{

        const doc = await UserModel.create({ 
            email,
            username,
           
        });
        const user= await UserModel.findOne({email:email })
        await StatsModel.create({
            userId:user._id
        })




        res.json({
              message:"user did not exist but  we  created it him  in the backend"

        })
    }
  
});


export default Authrouter;
