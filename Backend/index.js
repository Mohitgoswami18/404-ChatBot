import dotenv from "dotenv";
import express from "express";
import cors from "cors"

const app = express();
dotenv.config({path:'../.env'})


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:process.env.origin, 
    credentials:true,
}))

const port = process.env.PORT || 4000; 

import chatRoute from "./Routes/ChatBotRoutes.route.js"
app.use("/chatbot/v2", chatRoute);

app.listen(port, ()=>{
    console.log("The app is listening to the port", port);
})