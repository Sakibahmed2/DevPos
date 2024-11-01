import cors from "cors";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import globalRoute from "./routes/index.js";
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes

app.use("/api/v1", globalRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Not found error handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
