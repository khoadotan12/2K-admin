const brandModel = require('../models/brand')

exports.index = async (req, res, next) => {
    const data = await brandModel.list();
    res.render('brands/index', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Danh sách thương hiệu', data })
};

exports.add = (req, res, next) => {
    res.render('brands/add', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Tạo thương hiệu' });
};

exports.edit = (req, res, next) => {
};

exports.editPost = (req, res, next) => {
};

exports.addPost = (req, res, next) => {
    const name = req.body.brand;
    return brandModel.add(name, (error) => {
        if (error)
            return res.status(500).send(eror);
        return res.redirect('./');
    });
};

exports.delete = async (req, res, next) => {
    const resp = await brandModel.delete(req.body.id);
    if (resp)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};