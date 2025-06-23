const Joi = require('joi');

exports.registerSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().min(10).required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().optional(),
  isAdmin: Joi.boolean().optional(),
  status: Joi.string().optional()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});