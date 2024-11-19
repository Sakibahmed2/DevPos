const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Routes not found!",
    err: "",
  });
};

export default notFound;
