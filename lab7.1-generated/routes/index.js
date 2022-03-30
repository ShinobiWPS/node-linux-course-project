const got = require('got');
var express = require('express');
var router = express.Router({ mergeParams: true });

const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

/* GET home page. */
router.get('/', async function (req, res, next) {
  const urlboat = `http://localhost:${BOAT_SERVICE_PORT}/${req.params.id}`;
  const urlbrand = `http://localhost:${BRAND_SERVICE_PORT}/`;

  try {
    const boat = await got(urlboat).json();
    const brand = await got(`${urlbrand}${boat.brand}`).json();
    res.json({
      id: boat.id,
      color: boat.color,
      brand: brand.name,
    });
  } catch (err) {
    if (err?.response?.statusCode === 404) {
      next();
      return;
    }

    if (err?.response?.statusCode === 400) {
      const badRequest = new Error('bad request');
      badRequest.status = 400;

      next(badRequest);
      return;
    }

    next(err);
  }
});

module.exports = router;
