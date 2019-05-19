const SHA256 = require('crypto-js/sha256');
const userModel = require('../models/user');
const createError = require('http-errors');

exports.edit = async (req, res, next) => {
    const data = await userModel.getID(req.params.id);
    if (data)
        return res.render('users/edit', { title: 'Thay đổi thông tin', data });
    next(createError(404));
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

exports.editPost = async (req, res, next) => {
    const newUser = req.body;
    if (newUser.password == '')
        delete newUser.password;
    else
        newUser.password = SHA256(newUser.password).toString();
    const resp = await userModel.edit(newUser.userID, newUser);
    if (resp)
        return res.redirect('./');
    res.status(404).send("Not found ID");
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