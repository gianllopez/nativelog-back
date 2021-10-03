const Joi = require('joi');

const username = Joi.string().min(8).max(12).required();
const password = Joi.string().min(8).required();

const LogupSchema = Joi.object({
  full_name: Joi.required(),
  email: Joi.string().email(),
  username,
  password
});

const LoginSchema = Joi.object({ username, password });

module.exports = { LogupSchema, LoginSchema };