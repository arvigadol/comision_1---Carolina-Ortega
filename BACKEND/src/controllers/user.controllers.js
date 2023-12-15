import { UserModel } from "../models/user.model.js";

export const ctrlGetAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    .populate('posts', ['title', 'description', 'imageURL'])
    .populate('comments', ['description']);

    if (!allUsers) {
      return res.status(404).json({ message: "Aún no hay usuarios para mostrar" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo mostrar la lista de usuarios" });
  }
};


export const ctrlGetOneUser= async (req, res) => {
  const { userId } = req.params;
  try {       
    const user = await UserModel.findOne({_id: userId})
    .populate('posts', ['title', 'description', 'imageURL'])
    .populate('comments', ['description']);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "No se pudo mostrar el usuario" });
  }
};

export const ctrlUpdateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId });

    user.set(req.body);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo modificar el usuario" });
  }
};

export const ctrlDeleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.findOneAndDelete({ _id: userId });

    res.status(200).json("Usuario eliminado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};