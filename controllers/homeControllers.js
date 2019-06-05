const path = require('path');
const userModel = require('../models/user');
const productModel = require('../models/product');
const brandModel = require('../models/brand');
const orderController = require('../models/order');

const { formatPrice } = require('../global');

exports.home = async (req, res, next) => {
    const users = await userModel.count();
    const products = await productModel.count();
    const orders = await orderController.count();
    const brands = await brandModel.list();
    let revenue = 0;
    brands.forEach(item => revenue += item.revenue ? item.revenue : 0);
    const data = {
        revenue: formatPrice(revenue),
        users,
        products,
        orders,
    };
    res.render('home/index', { title: 'Trang chủ', data });
};

exports.loginGet = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
};

exports.logout = (req, res) => {
    req.session.destroy();
    req.logout();
    res.clearCookie('connect.sid');
    res.redirect('/login');
}