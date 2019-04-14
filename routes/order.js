var express = require('express');
var router = express.Router();

router.get('/done', (req, res, next) => {
    const data = [{
        price: '17,990,000',
        create: '04/04/2019',
        done: '16/04/2019',
        address: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM'
    }, {
        price: '3,990,000',
        create: '10/04/2019',
        done: '11/04/2019',
        address: '340 Quang Trung, Phường 10, Quận Gò Vấp, TPHCM'
    }, {
        price: '4,590,000',
        create: '14/03/2019',
        done: '06/04/2019',
        address: '108 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội'
    }, {
        price: '8,090,000',
        create: '26/03/2019',
        done: '27/04/2019',
        address: '182 Lê Đại Hành, Phường 15, Quận 11'
    }];
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
    });
    res.render('order/done', { category: 'Đơn hàng', categoryLink: '/order/done', title: 'Đơn hàng đã giao', data })
});

router.get('/delivering', (req, res, next) => {
    const data = [{
        price: '17,990,000',
        create: '04/04/2019',
        done: '16/04/2019',
        address: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM'
    }, {
        price: '3,990,000',
        create: '10/04/2019',
        done: '11/04/2019',
        address: '340 Quang Trung, Phường 10, Quận Gò Vấp, TPHCM'
    }, {
        price: '4,590,000',
        create: '14/03/2019',
        done: '06/04/2019',
        address: '108 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội'
    }, {
        price: '8,090,000',
        create: '26/03/2019',
        done: '27/04/2019',
        address: '182 Lê Đại Hành, Phường 15, Quận 11'
    }];
    data.forEach((element, index) => {
        element.id = (index + 1).toString();
    });
    res.render('order/delivering', { category: 'Đơn hàng', categoryLink: '/order/delivering', title: 'Đơn hàng đang giao', data })
});

module.exports = router;