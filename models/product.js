const mongoose = require('mongoose');
const brandModel = require('./brand');
const { productsSchemaName } = require('../global');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const ProductSchema = new Schema({
    brand: { type: ObjectId, required: true },
    name: String,
    price: Number,
    image: String,
    type: String,
    stock: Number,
    sold: Number,
    colors: [String],
    info: {
        RAM: Number,
        CPU: String,
        ROM: Number,
        PIN: Number,
        OS: String,
        Screen: Number,
        sim: Number,
        frontCamera: String,
        backCamera: String,
    }
});
const productModel = mongoose.model(productsSchemaName, ProductSchema);

exports.getAll = async () => {
    try {
        const products = await productModel.find();
        const result = Promise.all(products.map(async (product) => {
            const brand = await brandModel.getID(product.brand);
            product._doc.brand = brand ? brand.name : 'Hãng khác';
            return product._doc;
        }));
        return result;
    } catch (e) {
        return null;
    }
}

exports.getTop10 = async () => {
    try {
        const products = await productModel.find().sort({ sold: -1 }).limit(10);
        const result = Promise.all(products.map(async (product) => {
            const brand = await brandModel.getID(product.brand);
            product._doc.brand = brand ? brand.name : 'Hãng khác';
            return product._doc;
        }));
        return result;
    } catch (e) {
        return null;
    }
}

exports.add = async (product, callback) => {
    const brand = await brandModel.increaseCount(product.brand);
    if (brand) {
        const newProduct = new productModel(product);
        return newProduct.save(e => {
            return callback(e);
        })
    }
    else
        callback("Cannot increase");
}

exports.delete = async (id) => {
    try {
        return await productModel.findByIdAndRemove(id);
    } catch (e) {
        return null;
    }
}

exports.getID = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (e) {
        return null;
    }
}

exports.edit = async (id, data) => {
    try {
        const product = await productModel.findById(id);
        if (!data.image)
            data.image = product.image;
        data.sold = product.sold;
        return await productModel.findByIdAndUpdate(id, data);
    } catch (e) {
        return null;
    }
}

exports.setSold = async (id, sold) => {
    try {
        return await productModel.findByIdAndUpdate(id, { sold });
    } catch (e) {
        return null;
    }
}

exports.count = async () => {
    try {
        const count = await productModel.find().count();
        return count;
    }
    catch (e) {
        return null;
    }
};