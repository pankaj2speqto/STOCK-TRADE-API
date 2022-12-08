const Joi = require('joi');


const create = {
  body: Joi.object().keys({
    Type: Joi.string().required(),
    User_id: Joi.number().required(),
    symbol: Joi.string().required(),
    Shares: Joi.number().required(),
    Price:Joi.number().required()
  }),
};

module.exports={
    create
}