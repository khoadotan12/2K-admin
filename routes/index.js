var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'Trang chủ' });
});

module.exports = router;
