var express = require('express');
const { boat } = require('../model');
var router = express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', function (req, res, next) {
  boat.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
