var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.ip)
  if (req.socket.remoteAddress === '111.34.55.211') {
    res.status(403).send()
    return
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
