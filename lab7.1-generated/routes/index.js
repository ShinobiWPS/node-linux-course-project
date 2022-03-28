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
    res.status(200).json({
      id: boat.id,
      color: boat.color,
      brand: brand.name,
    });
  } catch (err) {
    if (!err.response) throw err;
    if (err.response.statusCode === 404) {
      res.status(404).json({});
    }
  }
});

module.exports = router;
