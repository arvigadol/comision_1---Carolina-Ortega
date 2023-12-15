import { header } from 'express-validator';
import { applyValidations } from '../../middlewares/applyValidations.js';

export const authHeader = [
  header('authorization')
    .exists().withMessage('Debe enviar el header { Authorization } con el token.'),
  applyValidations
];