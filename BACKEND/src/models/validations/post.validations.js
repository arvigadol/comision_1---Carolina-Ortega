import { header, param, body } from 'express-validator';
import { applyValidations } from '../../middlewares/applyValidations.js';
import { isValidObjectId } from 'mongoose';

export const createPostValidations = [
  body('title')
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  body('description')
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string.'),
  body('imageURL')
    .notEmpty().withMessage('El campo { imageURL } no debe estar vacio.')
    .isURL().withMessage('El campo { imageURL } debe ser una URL.'),
  applyValidations,
];


export const getOnePostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  applyValidations,
];

export const updatePostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  body('title')
    .optional()
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  body('description')
    .optional()
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string.'),
  body('imageURL')
    .optional()
    .notEmpty().withMessage('El campo { imageURL } no debe estar vacio.')
    .isURL().withMessage('El campo { imageURL } debe ser una URL.'),
  applyValidations,
];

export const deletePostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id válida.'),
  applyValidations,
];