import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title, description, imageURL } = req.body;

    const post = new PostModel({
      title,
      description,
      imageURL,
      author: userId,
    });

    await post.save();

    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { posts: post._id } }
    );
    res.status(201).json(post);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo crear el post" });
  }
};

export const ctrlGetAllPosts = async (req, res) => {
  try {
    const Allposts = await PostModel.find()
      .populate("author", ["username", "avatarURL"])
      .populate("comments", ["description"]);
    if (!Allposts) {
      return res.status(404).json({ message: "Aún no hay posts para mostrar" });
    }

    return res.status(200).json(Allposts);
  } catch (error) {
    return res.status(500).json({ error: "No se pudieron mostrar los posts" });
  }
};

export const ctrlGetOnePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    })
      .populate("author", ["username", "avatarURL"])
      .populate("comments", ["description"]);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo mostrar el post" });
  }
};

export const ctrlUpdatePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    post.set(req.body);

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo modificar el post" });
  }
};

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    await CommentModel.deleteMany({ _id: { $in: post.comments } });

    await PostModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    return res.status(200).json("Posteo eliminado");
  } catch (error) {
    return res.status(500).json({ error: "No se pudo eliminar el post" });
  }
};

export const isAuthor = async ({ postId, userId }) => {
  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
