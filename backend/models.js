import mongoose from 'mongoose';
import { ref } from 'process';

const Schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username:String,
  createdAt: { type: Date, default: Date.now },
  sessionNumber:{type:Number,default:0}

   
});

const SessionSchema=new Schema({
  createdAt: { type: Date, default: Date.now },
  sessionNumber:{ type: Number, required:true },
  numberOfQuestions:{ type: Number ,required:true},//required
  numberOfQuestionsDone:{ type: Number ,default:0},
  rightAnswers:{ type: Number, default:0 },
  wrongAnswers:{ type: Number, default:0 },
  timeTaken:{ type: Number, default:0},
  userId:{type:ObjectId,ref:"user"},//required
  statsId:{type:ObjectId,ref:"stats"},//required
  tables:{type:Array ,required:true},
  factor:{type:Number,default:10},
  completed:{type:Boolean,default:false}


})

const StatsSchema=new Schema({
  
  rightAnswers:{ type: Number, default:0},
  wrongAnswers:{ type: Number, default:0},
  timeTaken:{ type: Number, default:0},
  userId:{type:ObjectId,ref:"user"},
  streak:{ type: Number, default:0}


})

const QuestionSchema= new  Schema({
  sessionId:{type:ObjectId,required:true,unique:true},
  questions:{type:Array,required:true}
})

export const  UserModel=mongoose.model("user",userSchema)
export const   StatsModel=mongoose.model("stats",StatsSchema)
export const  SessionModel=mongoose.model("session",SessionSchema)
export const  QuestionModel=mongoose.model("questions",QuestionSchema)

