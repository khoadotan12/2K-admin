const SHA256 = require('crypto-js/sha256');
const userModel = require('../models/user');

exports.edit = (req, res, next) => {
    const data = {
        username: '1512241',
        email: 'dongkha97@gmail.com',
        phone: '0914619571',
    }
    res.render('users/edit', { title: 'Thay đổi thông tin', data });
};

exports.add = (req, res, next) => {
    res.render('users/add', { category: 'Tài khoản', categoryLink: '/users', title: 'Thêm tài khoản' });
};

exports.addPost = (req, res, next) => {
    const newUser = req.body;
    newUser.password = SHA256(newUser.password).toString();
    return userModel.add(newUser, (error) => {
        if (error)
            return res.status(500).send(eror);
        return res.redirect('./');
    });
};

exports.list = async (req, res, next) => {
    const users = await userModel.list();
    res.render('users/index', { category: 'Tài khoản', categoryLink: '/users', title: 'Danh sách tài khoản', users });
};

exports.delete = async (req, res, next) => {
    const resp = await userModel.delete(req.body.id);
    if (resp)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};