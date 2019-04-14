var express = require('express');
var router = express.Router();

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const sumArr = arr => arr.reduce((a, b) => a + b, 0);

router.get('/date', (req, res, next) => {
    const price = [6910000, 13940000, 31059000, 1099000, 9401000];
    const data = [
        {
            name: 'Samsung Galaxy A7',
            price: formatPrice(price[0]),
            count: 1,
        },
        {
            name: 'Xiaomi Mi Pro',
            price: formatPrice(price[1]),
            count: 4,
        },
        {
            name: 'iPhone XS Max 256 GB',
            price: formatPrice(price[2]),
            count: 2,
        },
        {
            name: 'Oppo Find X',
            price: formatPrice(price[3]),
            count: 1,
        },
        {
            name: 'Samsung Galaxy A9',
            price: formatPrice(price[4]),
            count: 3,
        },
    ];
    let sum = 0;
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
        element.total = formatPrice(price[index] * element.count);
        sum += (price[index] * element.count);
    });
    const totalSum = formatPrice(sum);
    res.render('revenue/date', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong ngày', data, totalSum });
});

router.get('/week', (req, res, next) => {
    const price = [6910000, 13940000, 31059000, 1099000, 9401000];
    const data = [
        {
            name: 'Samsung Galaxy A7',
            price: formatPrice(price[0]),
            count: 18,
        },
        {
            name: 'Xiaomi Mi Pro',
            price: formatPrice(price[1]),
            count: 9,
        },
        {
            name: 'iPhone XS Max 256 GB',
            price: formatPrice(price[2]),
            count: 22,
        },
        {
            name: 'Oppo Find X',
            price: formatPrice(price[3]),
            count: 10,
        },
        {
            name: 'Samsung Galaxy A9',
            price: formatPrice(price[4]),
            count: 6,
        },
    ];
    let sum = 0;
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
        element.total = formatPrice(price[index] * element.count);
        sum += (price[index] * element.count);
    });
    const totalSum = formatPrice(sum);
    res.render('revenue/week', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong tuần', data, totalSum });
});

router.get('/month', (req, res, next) => {
    res.render('revenue/month', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong tháng' });
});

router.get('/quarter', (req, res, next) => {
    res.render('revenue/quarter', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong quý' });
});

router.get('/year', (req, res, next) => {
    res.render('revenue/year', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong năm' });
});


module.exports = router;