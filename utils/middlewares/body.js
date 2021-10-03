function bodyMiddleware(req, res, next) {
  const parsedBody = Object.entries(req.body);
  if (parsedBody.length !== 0) next();
  else {
    res.status(400).json({
      error: true,
      message: 'Request body is empty.'
    });
  };
};

module.exports = { bodyMiddleware };