import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db";
import cors from "cors";
import morgan from "morgan";
import studentRoutes from "./routes/student.routes";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT;

// connection to databse
connectDB();

// common middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/v1/students", studentRoutes);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server listening successfully",
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
