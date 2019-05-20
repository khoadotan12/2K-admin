const orderModel = require('../models/order');
const productModel = require('../models/product');
const userModel = require('../models/user');

exports.done = async (req, res, next) => {
    const data = await orderModel.list(2);
    res.render('order/done', { category: 'Đơn hàng', categoryLink: '/order/done', title: 'Đơn hàng đã giao', data })
};

exports.add = async (req, res, next) => {
    const data = await productModel.getAll();
    const users = await userModel.list();
    res.render('order/add', { category: 'Đơn hàng', categoryLink: '#', title: 'Tạo đơn hàng', data, users });
}

exports.addPost = async (req, res, next) => {
    const data = req.body;
    data.items = [];
    data.items.push({ productID: data.item, count: 1 });
    data.create = new Date();
    data.status = 0;
    const productInfo = await productModel.getID(data.item);
    if (productInfo)
        data.price = productInfo.price;
    if (data.item)
        delete data.item;
    return orderModel.add(data, (error) => {
        if (error)
            return res.status(500).send(eror);
        return res.redirect('/order/receive');
    });
};

exports.delivering = async (req, res, next) => {
    const data = await orderModel.list(1);
    res.render('order/delivering', { category: 'Đơn hàng', categoryLink: '/order/delivering', title: 'Đơn hàng đang giao', data })
};

exports.receive = async (req, res, next) => {
    const data = await orderModel.list(0);
    res.render('order/receive', { category: 'Đơn hàng', categoryLink: '/order/receive', title: 'Đơn hàng chưa giao', data })
};

exports.cancel = async (req, res, next) => {
    const data = await orderModel.list(-1);
    res.render('order/cancel', { category: 'Đơn hàng', categoryLink: '/order/cancel', title: 'Đơn hàng đã hủy', data })
};

exports.changeState = async (req, res, next) => {
    const id = req.body.id;
    const state = req.body.state;
    const result = await orderModel.setState(id, state);
    if (result)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};

exports.info = async (req, res, next) => {

};