import { Router } from "express";
import { ctrlCreateComment, ctrlDeleteComment, ctrlGetAllComments, ctrlGetOneComment, ctrlUpdateComment } from "../controllers/comment.controllers.js";
import { createCommentValidations, deleteCommentValidations, getAllCommentsValidations, getOneCommentValidations, updateCommentValidations } from "../models/validations/comment.validations.js";

const commentRouter = Router();

commentRouter.get("/:postId", getAllCommentsValidations, ctrlGetAllComments);
commentRouter.post("/:postId", createCommentValidations, ctrlCreateComment);
commentRouter.get("/:postId/:commentId", getOneCommentValidations, ctrlGetOneComment);
commentRouter.patch("/:postId/:commentId", updateCommentValidations, ctrlUpdateComment);
commentRouter.delete("/:postId/:commentId", deleteCommentValidations, ctrlDeleteComment);

export { commentRouter };