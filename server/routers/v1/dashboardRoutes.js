import express from "express";
import { dashboardController } from "../../controllers/index.js";
import { authorization } from "../../middlewares/index.js";

const { getProfile } = dashboardController;

const dashboardRouter= express.Router();

dashboardRouter.get("/", authorization, getProfile);

export default dashboardRouter;
