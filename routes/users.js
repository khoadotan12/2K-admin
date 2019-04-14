var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const users = [{
    username: 'lukka',
    email: 'lukka@optonline.net',
    phone: '0496406146',
  },
  {
    username: 'ryanvm',
    email: 'ryanvm@aol.com',
    phone: '146604560',
  },
  {
    username: 'rmcfa',
    email: 'rmcfarla@live.com',
    phone: '146604560',
  },
  {
    username: 'ranasta',
    email: 'ranasta@me.com',
    phone: '526980288',
  },
  {
    username: 'sonnen',
    email: 'sonnen@verizon.net',
    phone: '7039393699',
  },
  {
    username: 'containfizzle',
    email: 'zwood@sbcglobal.net',
    phone: '97000356256',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  },
  {
    username: 'sonnen',
    email: 'sonnen@verizon.net',
    phone: '7039393699',
  },
  {
    username: 'containfizzle',
    email: 'zwood@sbcglobal.net',
    phone: '97000356256',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  },
  {
    username: 'sonnen',
    email: 'sonnen@verizon.net',
    phone: '7039393699',
  },
  {
    username: 'containfizzle',
    email: 'zwood@sbcglobal.net',
    phone: '97000356256',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  },
  {
    username: 'wilfernerd',
    email: 'ghost@mac.com',
    phone: '013431434',
  }];
  users.forEach((element, index) => {
    element.id = (index + 1).toString();
  });
  res.render('users/index', { category: 'Tài khoản', categoryLink: '/users', title: 'Danh sách tài khoản', users: users });
});

router.get('/add', function (req, res, next) {
  res.render('users/add', { category: 'Tài khoản', categoryLink: '/users', title: 'Thêm tài khoản' });
});

module.exports = router;
