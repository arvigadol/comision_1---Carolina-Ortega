import { Router } from "express";
import { ctrlCreatePost, ctrlDeletePost, ctrlGetAllPosts, ctrlGetOnePost, ctrlUpdatePost } from "../controllers/post.controllers.js";
import { createPostValidations, deletePostValidations, getOnePostValidations, updatePostValidations } from "../models/validations/post.validations.js";

const postRouter = Router();

postRouter.post("/new", createPostValidations, ctrlCreatePost);
postRouter.get("/:postId", getOnePostValidations, ctrlGetOnePost);
postRouter.patch("/:postId", updatePostValidations, ctrlUpdatePost);
postRouter.delete("/:postId", deletePostValidations, ctrlDeletePost);
postRouter.get("/", ctrlGetAllPosts);

export { postRouter };  