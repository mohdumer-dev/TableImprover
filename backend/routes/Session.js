import express from "express";
import mongoose from "mongoose";
const SessionRouter = express.Router();
import { UserModel, StatsModel, SessionModel,QuestionModel } from "../models.js";

SessionRouter.use(express.json());

SessionRouter.post("/create", async function (req, res) {
  const user = req.body.user;
  const numberOfQuestions = req.body.numberOfQuestions;
  const tables = req.body.tables;
  const email = user.primaryEmailAddress.emailAddress;
  const RealUser = await UserModel.findOne({ email: email });
  const RealStats = await StatsModel.findOne({ userId: RealUser });
  const sessionNumber = RealUser.sessionNumber + 1;
  //the factor should be innthe advanced setting of the frontend when we create a sessioon and it  tell us to give specifictions

  const factor = req.body.factor;

  // if(numberOfQuestions>50){
  //     res.s
  // }

  try {
    const session = await SessionModel.create({
      numberOfQuestions,
      userId: RealUser,
      statsId: RealStats,
      sessionNumber,
      tables,
      factor,
    });
    
    await UserModel.updateOne(
      { _id: RealUser._id }, // filter - which document to update
      { sessionNumber } // update - what to change
    );

    res.json({
      sessionId: session._id,
    });
  } catch {
    res.status(400).json({
      message: "There was error in the Session creating",
      
    });
  }
});


SessionRouter.get("/stats/:sessionId", async (req,res)=>{

const { sessionId } = req.params;

    const session = await SessionModel.findOne({ _id: sessionId });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
const { rightAnswers, numberOfQuestions } = session;
console.log(rightAnswers,
  numberOfQuestions)

res.json({
  rightAnswers,
  numberOfQuestions
})

})

SessionRouter.get("/generate/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    // number of questions comes from body

    // Find session in DB
    const session = await SessionModel.findOne({ _id: sessionId });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const { tables, factor, numberOfQuestions } = session;
    const questions = numberOfQuestions;
    const factorLimit = factor;

    // All possible combinations
    const allCombinations = [];
    for (let table of tables) {
      for (let factor = 1; factor <= factorLimit; factor++) {
        allCombinations.push({ table, multiplier: factor });
      }
    }

    // Shuffle helper
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffled = shuffle([...allCombinations]);
    let result = [];

    if (questions <= allCombinations.length) {
      result = shuffled.slice(0, questions);
    } else {
      result = [...shuffled];
      while (result.length < questions) {
        result.push(
          allCombinations[Math.floor(Math.random() * allCombinations.length)]
        );
      }
    }

    const question=await QuestionModel.findOne({sessionId:sessionId})
    if(!question){
      const questionsRes = await QuestionModel.create({
        sessionId,
        questions:result
    })
    res.json({
      message:questionsRes._id,
    }
    )
    }
    else{
      res.json({
      message:question._id,
    }
    )
    }

     } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error or you already  m" });
  }

 
});

SessionRouter.get("/getQuestions/:questionId",async function(req,res) {
    const {questionId}=req.params

    const questionDoc=await  QuestionModel.findOne({_id:questionId})
    const sessionDoc=await SessionModel.findOne({_id:questionDoc.sessionId})

    const {numberOfQuestionsDone}=sessionDoc

    const {questions}=questionDoc

    console.log(numberOfQuestionsDone)

    res.json(questions[numberOfQuestionsDone])


})

SessionRouter.post("/checkQuestions",async function (req,res) {

    const {sessionId}=req.body
    const question=req.body.question
    const answer=req.body.answer
    const{table,multiplier}=question
    
    const ActualAnswer=table*multiplier

    const sessionDoc=await SessionModel.findOne({_id:sessionId})
   
    let completed=false
    const{numberOfQuestions,numberOfQuestionsDone,statsId}=sessionDoc

    if(numberOfQuestions-1===numberOfQuestionsDone){


      await SessionModel.updateOne(
        { sessionId },
        { $set: {completed:true} }
        );

        completed=true

    }

    if(ActualAnswer==answer){

        const response=   await SessionModel.updateOne(
        { _id:sessionId },
        { $inc: { numberOfQuestionsDone: 1 ,rightAnswers:1} }
        );
        console.log(response)

        await StatsModel.updateOne(
        {_id: statsId},
        { $inc: { numberOfQuestionsDone: 1 ,rightAnswers:1} }
        );
        console.log(response)
        console.log("hello")

        res.json({correct:true,completed:completed})

    }else{

         await SessionModel.updateOne(
        {_id: sessionId },
        { $inc: { numberOfQuestionsDone: 1 ,wrongAnswers:1} }
        );

        await StatsModel.updateOne(
        { _id: statsId},
        { $inc: { numberOfQuestionsDone: 1 ,wrongAnswers:1} }
        );

        res.json({correct:false,completed:completed})

    }



    
})

export default SessionRouter;

