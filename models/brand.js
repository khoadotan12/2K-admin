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
        const model = await brandModel.find().sort({ sold: -1 }).limit(10);
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

exports.add = (data, callback) => {
    const newBrand = new brandModel({ name: data.name, revenue: 0, count: 0, sold: 0, image: data.image });
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

exports.edit = async (id, data) => {
    try {
        if (!data.image)
            return await brandModel.findByIdAndUpdate(id, { name: data.name });
        return await brandModel.findByIdAndUpdate(id, { name: data.name, image: data.image });
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

exports.setSoldAndRevenue = async (id, price) => {
    try {
        const brand = await brandModel.findById(id);
        console.log(price);
        if (brand) {
            const newSold = brand.sold + 1;
            const newRevenue = brand.revenue + price;
            return await brandModel.findByIdAndUpdate(id, { sold: newSold, revenue: newRevenue });
        }
        else
            return null;

    } catch (e) {
        return null;
    }
};