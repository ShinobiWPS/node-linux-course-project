const express = require('express');
const createError = require('http-errors');
const data = require('./data');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const value = await data();
  res.send('Hello World! ' + value);
});

app.use((req, res, next) => {
  if (req.originalUrl !== '/') {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
