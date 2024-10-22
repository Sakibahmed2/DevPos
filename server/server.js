import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import notFound from "./middlewares/notFound.js";
import { authRouter } from "./routes/authRoutes.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Not found error handler
app.use(notFound);

export default app;
