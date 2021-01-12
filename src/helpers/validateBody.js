import { formatErrors, getHttpCode } from "./utils";

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { details } = error;
    return res.status(422).json({ code: getHttpCode(422), errors: formatErrors(details) });
  }

  return next();
};

