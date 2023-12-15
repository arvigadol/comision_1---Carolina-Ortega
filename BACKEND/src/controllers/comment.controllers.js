import { CommentModel } from '../models/comment.model.js';
import { PostModel } from '../models/post.model.js';
import { UserModel } from '../models/user.model.js';

export const ctrlCreateComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const comment = new CommentModel({
      ...req.body,
      post: postId,
    });

    await comment.save();

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );

    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { comments: comment._id } }
    );

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo crear el comentario" });
  }
};

export const ctrlGetAllComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await CommentModel.find({ post: postId }, 
      ).populate('post', ['comments', 'author']);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron mostrar los comentarios" });
  }
};

export const ctrlGetOneComment = async (req, res) => {
  const { commentId, postId } = req.params;

  try {
    const comment = await CommentModel.findOne({
      _id: commentId,
      post: postId,
    }).populate('post');

    if (!comment) return res.status(404).json({ error: "El comentario no existe" });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "No se pudo mostrar el comentario" });
  }
};

export const ctrlUpdateComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await CommentModel.findOne({ _id: commentId });

    if (!comment) {
      return res.status(404).json({ error: "El comentario no existe" });
    }

    comment.set(req.body);

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "No se pudo modificar el comentario" });
  }
};

export const ctrlDeleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  try {
    await CommentModel.findOneAndDelete({ _id: commentId, post: postId });

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json("Comentario eliminado");
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el comentario" });
  }
};