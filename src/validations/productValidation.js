const Joi = require("joi");

module.exports.getProductsSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(50),
});

module.exports.productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(100).required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().greater(0).required(),
});
module.exports.productUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(100),
  quantity: Joi.number().min(1),
  price: Joi.number().greater(0),
}).or("name", "description", "quantity", "price");

module.exports.validateParamsIdSchema = Joi.object({
  id: Joi.string().required(),
});
