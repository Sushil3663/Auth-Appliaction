import mongoose from "mongoose";
import express, { Application, Request, Response } from "express";
import authRoutes from "./Routes/auth";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectionStr } from "./config";

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.disable("x-powered-by"); //lees hacker will know about this application

//connection string
mongoose.connect(connectionStr);

//Routes
app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
