var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    const price = [20990000, 28600000, 12990000];
    const data = [{
        name: 'Samsung Galaxy S10',
        brand: 'Samsung',
        count: 100,
        price: price[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    }, {
        name: 'iPhone XS Max 64 GB',
        brand: 'Apple',
        count: 542,
        price: price[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    }, {
        name: 'Xiaomi Mi Mix 3',
        brand: 'Xiaomi',
        count: 0,
        price: price[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    }];
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
    })
    res.render('products/index', { category: 'Sản phẩm', categoryLink: '/product', title: 'Danh sách sản phẩm', data })
});

router.get('/add', (req, res, next) => {
    res.render('products/add', { category: 'Sản phẩm', categoryLink: '/product', title: 'Thêm sản phẩm' });
});

module.exports = router;