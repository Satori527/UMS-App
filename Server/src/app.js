import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173","https://mern-tudu.netlify.app","https://mern-todo-lqa1sp916-anubhav-sharmas-projects-767ac030.vercel.app/","https://mern-todo-app-green.vercel.app"],
    credentials: true
}))

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended:true, limit:"32kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes
//import eventRouter from './routes/event.routes.js';
import taskRouter from './routes/task.routes.js';
import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

export { app };

