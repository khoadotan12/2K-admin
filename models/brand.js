const mongoose = require('mongoose');
const { brandsSchemaName } = require('../global');

const Schema = mongoose.Schema;
const BrandSchema = new Schema({
    name: String,
    count: Number,
    sold: Number,
    image: String,
    revenue: Number,
});
const brandModel = mongoose.model(brandsSchemaName, BrandSchema);

exports.getTop10 = async () => {
    try {
        const model = await brandModel.find().sort({sold: -1}).limit(10);
        return model;
    }
    catch (e) {
        return null;
    }
}

exports.list = async () => {
    try {
        const model = await brandModel.find();
        return model;
    }
    catch (e) {
        return null;
    }
}

exports.add = (name, callback) => {
    const newBrand = new brandModel({ name, count: 0, sold: 0, image: "" });
    return newBrand.save(e => {
        return callback(e);
    })
}

exports.getID = async (id) => {
    try {
        const model = await brandModel.findById(id);
        return model._doc;
    } catch (e) {
        return null;
    }
}

exports.delete = async (id) => {
    try {
        return await brandModel.findByIdAndRemove(id);
    } catch (e) {
        return null;
    }
}

exports.edit = async (id, name) => {
    try {
        return await brandModel.findByIdAndUpdate(id, { name });
    } catch (e) {
        return null;
    }
}

exports.increaseCount = async (id) => {
    try {
        const brand = await brandModel.findById(id);
        if (brand) {
            const newCount = brand.count + 1;
            return await brandModel.findByIdAndUpdate(id, { count: newCount });
        }
        else
            return null;
    } catch (e) {
        return null;
    }
}

exports.decreaseCount = async (name) => {
    try {
        console.log(name);
        const brand = await brandModel.findOne({ name });
        if (brand) {
            const newCount = brand.count - 1;
            return await brandModel.findOneAndUpdate({ name }, { count: newCount });
        }
        else
            return null;
    } catch (e) {
        return null;
    }
}