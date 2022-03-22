var express = require('express');
const { boat } = require('../model');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  boat.create(boat.uid(), req.body.data, function (err, result) {
    if (err) {
      return next(err);
    }
    res.status(201).json({ result });
  });
});

router.get('/:id', function (req, res, next) {
  boat.read(req.params.id, function (err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;
