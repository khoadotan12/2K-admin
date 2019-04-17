var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const data = {
    revenue: '1,062,231,000',
    users: 1717,
    products: 765,
    orders: 4166,
  };
  res.render('dashboard/index', { title: 'Trang chủ', data});
});

module.exports = router;
