const express = require('express');
const createError = require('http-errors');
const data = require('./data');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.sendStatus(405);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
