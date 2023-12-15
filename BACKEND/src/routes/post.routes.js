import { Router } from "express";
import { ctrlCreatePost, ctrlDeletePost, ctrlGetAllPosts, ctrlGetMisPosts, ctrlGetOnePost, ctrlGetOnePostDeAutor, ctrlUpdatePost } from "../controllers/post.controllers.js";
import { createPostValidations, deletePostValidations, getOnePostValidations, updatePostValidations } from "../models/validations/post.validations.js";

const postRouter = Router();

postRouter.post("/new", createPostValidations, ctrlCreatePost);
postRouter.get("/:postId", getOnePostValidations, ctrlGetOnePost);
postRouter.patch("/:postId", updatePostValidations, ctrlUpdatePost);
postRouter.delete("/:postId", deletePostValidations, ctrlDeletePost);
//ver
postRouter.get("/mipost", ctrlGetOnePostDeAutor)
postRouter.get("/", ctrlGetAllPosts);


export { postRouter };  