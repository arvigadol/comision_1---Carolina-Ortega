import { Router } from "express";
import { ctrlCreateNewUser, ctrlLoginUser } from "../controllers/auth.controllers.js";
import { createUserValidations, loginUserValidations } from "../models/validations/user.validations.js";

const authRouter = Router();

authRouter.post("/register", createUserValidations, ctrlCreateNewUser);

authRouter.post("/login", loginUserValidations, ctrlLoginUser);

export { authRouter };