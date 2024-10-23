const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Something went wrong!!";

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
