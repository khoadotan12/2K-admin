const SHA256 = require('crypto-js/sha256');
const moderatorModel = require('../models/moderator');
const createError = require('http-errors');

exports.edit = async (req, res, next) => {
    const data = await moderatorModel.getID(req.params.id);
    if (data)
        return res.render('moderators/edit', { title: 'Thay đổi thông tin quản trị viên', data });
    next(createError(404));
};

exports.add = (req, res, next) => {
    res.render('moderators/add', { category: 'Quản trị', categoryLink: '/moderators', title: 'Thêm quản trị viên' });
};

exports.addPost = (req, res, next) => {
    const newModerator = req.body;
    newModerator.password = SHA256(newModerator.password).toString();
    return moderatorModel.add(newModerator, (error) => {
        if (error)
            return res.status(500).send(eror);
        return res.redirect('./');
    });
};

exports.editPost = async (req, res, next) => {
    const newModerator = req.body;
    if (newModerator.password == '')
        delete newModerator.password;
    else
        newModerator.password = SHA256(newModerator.password).toString();
    const resp = await moderatorModel.edit(newModerator.moderatorID, newModerator);
    if (resp)
        return res.redirect('./');
    next(createError(404));
};

exports.list = async (req, res, next) => {
    const users = await moderatorModel.list();
    res.render('moderators/index', { category: 'Quản trị', categoryLink: '/moderators', title: 'Danh sách quản trị viên', users });
};

exports.delete = async (req, res, next) => {
    const resp = await moderatorModel.delete(req.body.id);
    if (resp)
        return res.status(200).send("Success");
    next(createError(404));
};