const { formatPrice } = require('../global');
const productModel = require('../models/product');
const brandModel = require('../models/brand');

exports.index = async (req, res, next) => {
    const data = await productModel.getAll();
    data.forEach(item => {
        item.price = formatPrice(item.price);
    })
    res.render('products/index', { category: 'Sản phẩm', categoryLink: '/product', title: 'Danh sách sản phẩm', data })
};

exports.add = async (req, res, next) => {
    const brands = await brandModel.list();
    res.render('products/add', { category: 'Sản phẩm', categoryLink: '/product', title: 'Thêm sản phẩm', brands });
};

exports.addPost = (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    res.redirect('./');
};