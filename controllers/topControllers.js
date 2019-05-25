const productModel = require('../models/product');
const brandModel = require('../models/brand');


exports.products = async (req, res, next) => {
    const data = await productModel.getTop10();
    res.render('top/product', { category: 'Top 10', categoryLink: '/', title: 'Sản phẩm', data });
};

exports.brands = async (req, res, next) => {
    const data = await brandModel.getTop10();
    res.render('top/brand', { category: 'Top 10', categoryLink: '/', title: 'Thương hiệu', data });
};