var express = require('express');
var router = express.Router();

router.get('/date', (req, res, next) => {
    res.render('revenue/date', { category: 'Doanh thu', categoryLink: '/', title: 'Ngày' });
});

router.get('/week', (req, res, next) => {
    res.render('revenue/week', { category: 'Doanh thu', categoryLink: '/', title: 'Tuần' });
});

router.get('/month', (req, res, next) => {
    res.render('revenue/month', { category: 'Doanh thu', categoryLink: '/', title: 'Tháng' });
});

router.get('/quarter', (req, res, next) => {
    res.render('revenue/quarter', { category: 'Doanh thu', categoryLink: '/', title: 'Quý' });
});

router.get('/year', (req, res, next) => {
    res.render('revenue/year', { category: 'Doanh thu', categoryLink: '/', title: 'Năm' });
});


module.exports = router;