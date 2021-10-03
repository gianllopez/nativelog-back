const express = require('express');
const { bodyMiddleware } = require('./utils/middlewares/body');
const { SchemaValidator } = require('./utils/middlewares/schema-validator');
const app = express();

app.use(express.json());
app.use(bodyMiddleware);
app.use(SchemaValidator);

app.post('/logup', (req, res) => {
  console.log(req.body);
});

app.listen(8080, () => {
  console.log('Server listening on http://locahost:8080');
});