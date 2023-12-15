import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config';

const app = express();

import { env } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js";

//Middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }));
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false
}));

//Conexión al servidor y la base de datos
app.listen(env.port, async () => {
    await startConnection({ uri: env.mongo, database: env.database });
    console.log(`Servidor corriendo en http://localhost:${env.port}`)
})