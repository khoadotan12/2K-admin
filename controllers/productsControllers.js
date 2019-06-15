const { formatPrice } = require('../global');
const productModel = require('../models/product');
const brandModel = require('../models/brand');
const createError = require('http-errors');

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
    result.colors = [];
    if (data.color1)
        result.colors.push(data.color1);

    if (data.color2)
        result.colors.push(data.color2);

    if (data.color3)
        result.colors.push(data.color3);

    if (data.color4)
        result.colors.push(data.color4);

    if (data.color5)
        result.colors.push(data.color5);

    if (data.color6)
        result.colors.push(data.color6);

    if (data.color7)
        result.colors.push(data.color7);
        
    if (data.color8)
        result.colors.push(data.color8);
    result.info = info;
    return result;
}

exports.index = async (req, res, next) => {
    const data = await productModel.getAll();
    data.forEach(item => {
        item.price = formatPrice(item.price);
    });
    res.render('products/index', { category: 'Sản phẩm', categoryLink: '/product', title: 'Danh sách sản phẩm', data })
};

exports.add = async (req, res, next) => {
    const brands = await brandModel.list();
    res.render('products/add', { category: 'Sản phẩm', categoryLink: '/product', title: 'Thêm sản phẩm', brands });
};

exports.addPost = (req, res, next) => {
    const data = parseAddRequest(req.body);
    data.image = "/images/products/" + req.file.filename;
    return productModel.add(data, (error) => {
        if (error)
            return res.status(500).send(eror);
        return res.redirect('./');
    });
};

exports.delete = async (req, res, next) => {
    const resp = await productModel.delete(req.body.id);
    if (resp) {
        brandModel.decreaseCount(req.body.brand);
        return res.status(200).send("Success");
    }
    next(createError(404));
}

exports.edit = async (req, res, next) => {
    const brands = await brandModel.list();
    const productInfo = await productModel.getID(req.params.id);
    if (productInfo) {
        productInfo.colors.forEach(color => {
            switch (color) {
                case "Đen":
                    productInfo.color1 = true;
                    break;
                case "Xám":
                    productInfo.color2 = true;
                    break;
                case "Xanh":
                    productInfo.color3 = true;
                    break;
                case "Vàng":
                    productInfo.color4 = true;
                    break;
                case "Bạc":
                    productInfo.color5 = true;
                    break;
                case "Đỏ":
                    productInfo.color6 = true;
                    break;
                case "Tím":
                    productInfo.color7 = true;
                    break;
                case "Hồng":
                    productInfo.color8 = true;
                    break;
            }
        });
        return res.render('products/edit', { category: 'Sản phẩm', categoryLink: '/product', title: 'Sửa sản phẩm', brands, productInfo });
    }
    next(createError(404));
}

exports.editPost = async (req, res, next) => {
    const data = parseAddRequest(req.body);
    const resp = await productModel.edit(req.body.productID, data);
    if (resp)
        return res.redirect('./');
    next(createError(404));
}