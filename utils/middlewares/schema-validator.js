const { LogupSchema, LoginSchema } = require('../schemas');

function SchemaValidator(req, res, next) {
  let schema = req.path === '/logup' ? LogupSchema : LoginSchema,
  { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      message: error.message
    });
  } else { next() };
};

module.exports = { SchemaValidator };
