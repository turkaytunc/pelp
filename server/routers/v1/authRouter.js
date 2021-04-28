import express from "express";
import { authController } from "../../controllers/index.js";

const { register, login } = authController;

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
