const brandModel = require('../models/brand');
const imgurUploader = require('imgur-uploader');
const fs = require('fs');
const { imageTempPath } = require('../global');

exports.index = async (req, res, next) => {
    const data = await brandModel.list();
    res.render('brands/index', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Danh sách thương hiệu', data })
};

exports.add = (req, res, next) => {
    res.render('brands/add', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Tạo thương hiệu' });
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    const brandInfo = await brandModel.getID(id);
    if (brandInfo)
        return res.render('brands/edit', { category: 'thương hiệu', categoryLink: '/brands', title: 'Sửa thương hiệu', brandInfo });
    res.status(404).send("Not found ID");
};

exports.editPost = async (req, res) => {
    const newName = req.body.brand;
    const data = {};
    data.name = newName;
    if (req.file) {
        try {
            const image = await imgurUploader(fs.readFileSync(imageTempPath + '/' + req.file.filename));
            data.image = image.link;
        } catch (err) {
            return res.status(500).send(err);
        }
    }
    const resp = await brandModel.edit(req.body.brandID, data);
    if (resp)
        return res.redirect('./');
    res.status(404).send("Not found ID");
};

exports.addPost = async (req, res, next) => {
    const name = req.body.brand;
    const data = {};
    data.name = name;
    try {
        const image = await imgurUploader(fs.readFileSync(imageTempPath + '/' + req.file.filename));
        data.image = image.link;
    } catch (err) {
        return res.status(500).send(err);
    }
    return brandModel.add(data, (error) => {
        if (error)
            return res.status(500).send(error);
        return res.redirect('./');
    });
};

exports.delete = async (req, res, next) => {
    const resp = await brandModel.delete(req.body.id);
    if (resp)
        return res.status(200).send("Success");
    res.status(404).send("Not found ID");
};