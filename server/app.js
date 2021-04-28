import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { authRoutes, dashboardRoutes, restaurantRoutes, reviewRoutes } from "./routers/v1/index.js";
import { HttpError } from "./util/index.js";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Unhandled Endpoint Error
app.get("/*", (req, res, next) => {
  const error = new HttpError("Page Not Found", 404);
  return next(error);
});

// Global Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.status || 500);
  return res.json({ message: error.message || "An unexpected error occurred!" });
});

export default app;
