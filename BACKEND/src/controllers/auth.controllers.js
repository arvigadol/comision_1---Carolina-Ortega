import { UserModel } from "../models/user.model.js";
import { createJWT } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const ctrlCreateNewUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);    

    newUser.password = await bcrypt.hash(newUser.password, 10); 

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo registrar al usuario" });
  }
};

export const ctrlLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "No se encontró el usuario" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Credenciales inválidas, revise su correo y su contraseña" });

    const token = await createJWT({ userId: user._id });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "No se pudo loguear al usuario" });
  }
};
