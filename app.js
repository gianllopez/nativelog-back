require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { bodyMiddleware } = require('./src/middlewares/body');
const { SchemaValidator } = require('./src/middlewares/schema-validator');
const { errorHandler } = require('./src/middlewares/error');
const { UsersService } = require('./src/services/users');
const usersService = new UsersService();
const app = express();

app.use(express.json());
app.use(bodyMiddleware);
app.use(SchemaValidator);

app.post('/logup', async (req, res, next) => {
  try {
    let user = await usersService.createUser(req.body),
    { password, ...rest } = user;
    jwt.sign(rest, process.env.SALT_HASH, (err, token) => {
      if (err) return next(err);
      res.status(201).json({ status: 'created', token });
    });
  } catch(err) { next(err) };
});

app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server listening on http://locahost:8080');
});