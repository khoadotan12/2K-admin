const { formatPrice } = require('../global');
const productModel = require('../models/product');
const brandModel = require('../models/brand');

function parseAddRequest(data) {
    const info = {};

    info.RAM = parseInt(data.RAM);
    info.sim = parseInt(data.sim);
    info.ROM = parseInt(data.ROM);
    info.PIN = parseInt(data.PIN);
    info.Screen = parseFloat(data.Screen);
    info.CPU = data.CPU;
    info.backCamera = data.backCamera;
    info.frontCamera = data.frontCamera;
    info.OS = data.OS;
    const result = {};
    result.name = data.name;
    result.brand = data.brand;
    result.stock = parseInt(data.stock);
    result.sold = 0;
    result.price = parseInt(data.price);
    result.type = data.type;
    result.image = "";
    result.color = [];
    result.info = info;
    return result;
}

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
    const data = parseAddRequest(req.body);
    return productModel.add(data, (error) => {
        console.log(error);
        if (error)
            return res.status(500).send(eror);
        return res.redirect('./');
    });
};