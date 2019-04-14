var express = require('express');
var router = express.Router();

router.get('/date', (req, res, next) => {
    res.render('revenue/date', { category: 'Doanh thu', categoryLink: '/', title: 'Doanh thu trong ngày' });
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