const brandModel = require('../models/brand')

exports.index = async (req, res, next) => {
    const data = await brandModel.list();
    res.render('brands/index', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Danh sách thương hiệu', data })
};

exports.add = (req, res, next) => {
    res.render('brands/add', { category: 'Thương hiệu', categoryLink: '/brands', title: 'Tạo thương hiệu' });
};
