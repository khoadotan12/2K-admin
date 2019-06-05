const path = require('path');
const userModel = require('../models/user');
const productModel = require('../models/product');
const brandModel = require('../models/brand');

exports.home = async (req, res, next) => {
    const users = await userModel.count();
    const data = {
        revenue: '1,062,231,000',
        users,
        products: 765,
        orders: 4166,
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