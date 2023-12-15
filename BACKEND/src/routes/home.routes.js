import { Router } from "express";
import { ctrlGetAllPosts, ctrlGetMisPosts } from "../controllers/post.controllers.js";

const homeRouter = Router();

homeRouter.get("/");
homeRouter.get("/blog", ctrlGetAllPosts);
//porque no puedo resolver lo del token
//Me falta lograr filtrar por token o id de autor, borrar de acá y cambiar el enrutador
homeRouter.get("/misposts", ctrlGetMisPosts);

export { homeRouter };