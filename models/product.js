const mongoose = require('mongoose');
const brandModel = require('./brand');
const { perPage } = require('../global');

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
const productModel = mongoose.model('products', ProductSchema);

exports.getAll = async () => {
    try {
        const products = await productModel.find();
        const result = Promise.all(products.map(async (product) => {
            const brand = await brandModel.query(product.brand);
            product._doc.brand = brand ? brand.name : 'Hãng khác';
            return product._doc;
        }));
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}


exports.add = (product, callback) => {
    const newProduct = new productModel(product);
    return newProduct.save(e => {
        return callback(e);
    })
}

exports.delete = async (id) => {
    try {
        return await productModel.findByIdAndRemove(id);
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.getID = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.edit = async (id, data) => {
    try {
        return await productModel.findByIdAndUpdate(id, data);
    } catch (e) {
        console.log(e);
        return null;
    }
}