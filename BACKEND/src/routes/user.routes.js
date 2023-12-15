import { Router } from "express";
import { ctrlDeleteUser, ctrlGetAllUsers, ctrlGetOneUser, ctrlUpdateUser } from "../controllers/user.controllers.js";
import { deleteUserValidations, getOneUserValidations, updateUserValidations } from "../models/validations/user.validations.js";

const userRouter = Router();

userRouter.get("/", ctrlGetAllUsers);
userRouter.get("/:userId", getOneUserValidations, ctrlGetOneUser);
userRouter.patch("/:userId", updateUserValidations, ctrlUpdateUser);
userRouter.delete("/:userId", deleteUserValidations, ctrlDeleteUser);

export { userRouter };