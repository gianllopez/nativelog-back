function errorHandler(err, req, res, next) {
  let { name, errors } = err;
  if (name === 'ValidationError') {
    let keys = Object.keys(errors), resp = {};
    for (let key of keys) {
      resp[key] = errors[key].message;
    };
    return res.status(400).json(resp);
  };
  res.status(500).json({
    error: true,
    message: 'Something went wrong.'
  });
};

module.exports = { errorHandler };