import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
