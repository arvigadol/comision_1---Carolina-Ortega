import { body, param } from 'express-validator';
import { applyValidations } from '../../middlewares/applyValidations.js';
import { isValidObjectId } from 'mongoose';

export const createCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  body('description')
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string.'),
  applyValidations,
];

export const getAllCommentsValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  applyValidations,
];

export const getOneCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id válida.'),
  applyValidations,
];

export const updateCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id válida.'),
  body('description')
    .optional()
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string.'),
  applyValidations,
];

export const deleteCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id válida.'),
    applyValidations,
];