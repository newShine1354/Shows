import path from "path";
import dotenv from "dotenv";
import express from "express";
import route from "./routes/routes.js";
import connectDB from "./db/indes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const port = process.env.PORT || 5000;
const app = express()
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", route);
app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.listen(port, () => {
  connectDB();
  console.log("server is running at port");
});
