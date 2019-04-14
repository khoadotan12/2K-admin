var express = require('express');
var router = express.Router();

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const sumArr = arr => arr.reduce((a, b) => a + b, 0);

router.get('/date', (req, res, next) => {
    const price = [6910000, 13940000, 31059000, 1099000, 9401000]
    const data = [
        {
            price: formatPrice(price[0]),
            status: 0,
        }, {
            price: formatPrice(price[1]),
            status: 1,
        }, {
            price: formatPrice(price[2]),
            status: 1,
        }, {
            price: formatPrice(price[3]),
            status: 1,
        }, {
            price: formatPrice(price[4]),
            status: 0,
        },
    ];
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
    });
    const total = formatPrice(sumArr(price));
    res.render('revenue/date', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong ngày', data, total });
});

router.get('/week', (req, res, next) => {
    res.render('revenue/week', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong tuần' });
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