const Responses = require("@constant/responses");
const responses = new Responses();

const globalErrorMiddleware = (err, req, res, next) => {
  const errMsg = err.message ?? "Internal Server Error";
  const status = err.status || 500;
  if (res.headersSent) {
    return next(err);
  }

  return res.status(status).json(responses.generic_error(status, errMsg));
};

module.exports = globalErrorMiddleware;
