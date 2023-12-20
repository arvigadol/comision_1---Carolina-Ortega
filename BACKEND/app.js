import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config';

const app = express();

import { env } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js";
import { authHeader } from './src/models/validations/auth.validation.js';
import { validateToken } from "./src/middlewares/validateToken.js";

import { authRouter } from './src/routes/auth.routes.js';
import { commentRouter } from './src/routes/comment.routes.js';
import { postRouter } from './src/routes/post.routes.js';
import { userRouter } from "./src/routes/user.routes.js";
import { homeRouter } from "./src/routes/home.routes.js";

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

app.use('/api', homeRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', authHeader, validateToken, postRouter);
app.use('/api/comments', authHeader, validateToken, commentRouter);

app.listen(env.port, async () => {
    await startConnection({ uri: env.mongo, database: env.database });
    console.log(`Servidor corriendo en http://localhost:${env.port}`)
});