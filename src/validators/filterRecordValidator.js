import Joi from "joi";

const filterRecordValidator = Joi.object({
  startDate: Joi.date().required().messages({
    "date.base": "startDate must be a be of YYYY-MM-DD format",
    "any.required": "startDate is required",
  }),
  endDate: Joi.date()
    .required()
    .greater(Joi.ref("startDate"))
    .max("now")
    .messages({
      "date.base": "endDate must be a be of YYYY-MM-DD format",
      "date.greater": "endDate must be greater than startDate",
      "date.max": "endDate cannot be greater than current date",
      "any.required": "endDate is required",
    }),
  maxCount: Joi.number()
    .required()
    .strict()
    .greater(Joi.ref("minCount"))
    .messages({
      "number.base": "maxCount must be numeric",
      "number.empty": "Please enter the maxCount",
      "any.required": "maxCount is required",
      "number.greater": "maxCount must be greater than minCount",
    }),
  minCount: Joi.number().required().strict().messages({
    "number.base": "minCount must be numeric",
    "number.empty": "Please enter the minCount",
    "any.required": "minCount is required",
  }),
}).options({ abortEarly: false });

export default filterRecordValidator;
