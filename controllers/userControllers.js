const SHA256 = require('crypto-js/sha256');
const userModel = require('../models/user');
const createError = require('http-errors');

exports.edit = async (req, res, next) => {
    const data = await userModel.getID(req.params.id);
    if (data)
        return res.render('users/edit', { title: 'Thay đổi thông tin khách hàng', data });
    next(createError(404));
};

exports.add = (req, res, next) => {
    res.render('users/add', { category: 'Khách hàng', categoryLink: '/users', title: 'Thêm tài khoản khách hàng' });
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

exports.editPost = async (req, res, next) => {
    const newUser = req.body;
    if (newUser.password == '')
        delete newUser.password;
    else
        newUser.password = SHA256(newUser.password).toString();
    const resp = await userModel.edit(newUser.userID, newUser);
    if (resp)
        return res.redirect('./');
    next(createError(404));
};

exports.list = async (req, res, next) => {
    const users = await userModel.list();
    res.render('users/index', { category: 'Khách hàng', categoryLink: '/users', title: 'Danh sách khách hàng', users });
};

exports.delete = async (req, res, next) => {
    const resp = await userModel.delete(req.body.id);
    if (resp)
        return res.status(200).send("Success");
    next(createError(404));
};

exports.verifyEmail = async (req, res) => {
    const user = await userModel.getEmail(req.body.email);
    if (user)
        return res.send("Email đã được sử dụng.");
    return res.status(200).send();
}