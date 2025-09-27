 import { UserModel,StatsModel } from "../models.js"

 import mongoose from "mongoose";
 export default async function check(req,res,next){
 console.log("They hited me")
    const user=req.body.user
    const username=user.fullName
    const email=user.primaryEmailAddress.emailAddress

    console.log(email)

    const exists= await UserModel.findOne({email:email})

    console.log(exists)

    if(exists){
        // res.json({
        //     message:"user already exists"
        // })

        const existsStats= await StatsModel.findOne({userId:exists._id})

        if(existsStats){

            next()

        }


        else{

             await StatsModel.create({
            userId:exists._id
        })

        next()

        }

      

    }else{

         await UserModel.create({ 
            email,
            username,
           
        });
        const user= await UserModel.findOne({email:email })
        await StatsModel.create({
            userId:user._id
        })




        // res.json({
        //       message:"user did not exist but  we  created it him  in the backend"

        // })
        next()
    }

}