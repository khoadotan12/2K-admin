var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users/index', {root: 'Trang chủ', category: 'Tài khoản', title: 'Danh sách tài khoản'});
});

router.get('/add', function (req, res, next) {
  res.render('users/add', { root: 'Trang chủ', category: 'Tài khoản', title: 'Thêm tài khoản' });
});

module.exports = router;
