'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const { PORT = 3000 } = process.env;

router.get('/', (req, res) => {
  let key = typeof req.query.un === 'string' ? req.query.un : null;
  console.log('key:', key);
  console.log('req.query.un:', req.query.un);
  key = Array.isArray(key) ? key[0] : key;
  console.log('Array.isArray(key):', Array.isArray(key));
  console.log('key:', key);
  console.log('!!key:', !!key);
  setTimeout(() => {
    res.send((key || '').toUpperCase());
  }, 1000);
});

app.use(router);
app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
