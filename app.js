require('dotenv').config();

const express = require('express');
const app = express();

const { bodyMiddleware } = require('./src/middlewares/body');
const { SchemaValidator } = require('./src/middlewares/schema-validator');
const { errorHandler } = require('./src/middlewares/error');

const { UsersService } = require('./src/services/users');
const { JWTService } = require('./src/services/jwt');

const usersService = new UsersService();
const jwtService = new JWTService();

app.use(express.json());
app.use(bodyMiddleware);
app.use(SchemaValidator);

app.post('/logup', async (req, res, next) => {
  try {
    let user = await usersService.create(req.body),
    token = await jwtService.sign(user);
    res.status(201).json({ status: 'created', token });
  } catch(err) { next(err) };
});

app.post('/login', async (req, res) => {
  let user = await usersService.get(req.body);
  if (user) {
    token = await jwtService.sign(user);
    res.status(200).json({ status: 'logged', token });
  };
  res.status(404).json({
    error: true,
    message: 'Given credentials are invalid.'
  });
});

app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server listening on http://locahost:8080');
});