const orderModel = require('../models/order');

exports.done = async (req, res, next) => {
    const data = await orderModel.list(2);
    res.render('order/done', { category: 'Đơn hàng', categoryLink: '/order/done', title: 'Đơn hàng đã giao', data })
};

exports.delivering = async (req, res, next) => {
    const data = await orderModel.list(1);
    res.render('order/delivering', { category: 'Đơn hàng', categoryLink: '/order/delivering', title: 'Đơn hàng đang giao', data })
};

exports.receive = async (req, res, next) => {
    const data = await orderModel.list(0);
    res.render('order/receive', { category: 'Đơn hàng', categoryLink: '/order/receive', title: 'Đơn hàng chưa giao', data })
};

exports.cancelGET = async (req, res, next) => {
    const data = await orderModel.list(-1);
    res.render('order/cancel', { category: 'Đơn hàng', categoryLink: '/order/cancel', title: 'Đơn hàng đã hủy', data })
};

exports.cancelPUT = async (req, res, next) => {
    const result = await orderModel.cancel(req.body.id);
    if (result)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};

exports.changeState = async (req, res, next) => {
    const id = req.body.id;
    const state = req.body.state;
    const result = await orderModel.setState(id, state);
    if (result)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};