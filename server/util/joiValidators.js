import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(5)
    .max(15)
    .regex(/^[a-zA-Z0-9]+$/)
    .message('Name can only contain alphanumeric characters!')
    .required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).max(20).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).max(20).required(),
});

export const restaurantValidation = Joi.object({
  name: Joi.string().trim().min(3).max(40).required(),
  location: Joi.string().trim().min(3).max(40).required(),
  price_range: Joi.number().min(1).max(5).required(),
});

export const restaurantIdValidation = Joi.object({
  id: Joi.number().min(1).max(100000).required(),
});
