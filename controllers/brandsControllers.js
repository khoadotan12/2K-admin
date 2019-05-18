const brandModel = require('../models/brand')

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
    const resp = await brandModel.edit(req.body.brandID, newName);
    if (resp)
        return res.redirect('./');
    res.status(404).send("Not found ID");
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