const { formatPrice } = require('../global');
const productModel = require('../models/product');
exports.index = async (req, res, next) => {
    const data = await productModel.getAll();
    res.render('products/index', { category: 'Sản phẩm', categoryLink: '/product', title: 'Danh sách sản phẩm', data })
};

exports.add = (req, res, next) => {
    res.render('products/add', { category: 'Sản phẩm', categoryLink: '/product', title: 'Thêm sản phẩm' });
};
