var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.baseURL = req.baseUrl
  res.render('index');
});

module.exports = router;
