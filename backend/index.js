import express from 'express';
const app = express();
import Authrouter from "./routes/auth.js"
import mongoose from 'mongoose';
import StatsRouter from './routes/stats.js';
import 'dotenv/config'
import cors from 'cors'


const  corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://frontendtable.vercel.app/',
  ],
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

import SessionRouter from './routes/Session.js';

mongoose.connect(process.env.MONGOOSE_URL).then(
    console.log("It is connected")
)


// Mount the router at a specific path
app.use('/api/v1/auth', Authrouter);
app.use("/api/v1/stats",StatsRouter);
app.use("/api/v1/session",SessionRouter);
app.listen(3000);