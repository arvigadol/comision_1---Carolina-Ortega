import jwt from 'jsonwebtoken';
import { env } from '../settings/config.js';

export const createJWT = async ({ userId }) => {
  return new Promise((res, rej) => {
    jwt.sign({ userId }, env.jwt_word, { expiresIn: '1h' }, (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

export const verifyJWT = async ({ token }) => {
    return new Promise((res, rej) => {
      jwt.verify(token, env.jwt_word, (err, decoded) => {
        if (err || !decoded.userId) rej('Token no válido');
        res(decoded);
      });
    });
  };