var express = require('express');
var router = express.Router();

router.get('/products', (req, res, next) => {
    res.render('top/product', { category: 'Top 10', categoryLink: '/', title: 'Sản phẩm' });
});

router.get('/brands', (req, res, next) => {
    res.render('top/brand', { category: 'Top 10', categoryLink: '/', title: 'Thương hiệu' });
});



module.exports = router;