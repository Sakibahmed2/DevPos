const sendResponse = (res, data) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode || 200,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
