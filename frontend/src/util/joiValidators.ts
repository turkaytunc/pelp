import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(5)
    .max(15)
    .regex(/^[a-zA-Z0-9]+$/)
    .message('Name can only contain alphanumeric characters!')
    .required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).max(20).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).max(20).required(),
});

export const restaurantValidation = Joi.object({
  restaurantName: Joi.string().trim().min(3).max(40).required().label('restaurant name'),
  restaurantLocation: Joi.string().trim().min(3).max(40).required().label('restaurant location'),
  restaurantPrice: Joi.number().min(1).max(5).required().label('restaurant price'),
});

export const reviewValidation = Joi.object({
  username: Joi.string().trim().min(3).max(40).required(),
  userRating: Joi.string().trim().max(1).required().label('rating'),
  comment: Joi.string().trim().min(10).max(100).required(),
});
