const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BrandSchema = new Schema({
    name: String,
    count: Number,
    sold: Number,
    image: String,
});
const brandModel = mongoose.model('brands', BrandSchema);

// exports.queryByName = async (name) => {
//     try {
//         const model = await brandModel.find({ name });
//         return model;
//     }
//     catch (e) {
//         console.log(e);
//         return null;
//     }
// }

// exports.query = async (id) => {
//     try {
//         const model = await brandModel.findById(id);
//         return model._doc;
//     }
//     catch (e) {
//         console.log(e);
//         return null;
//     }
// }

exports.list = async () => {
    try {
        const model = await brandModel.find();
        return model;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.add = (name, callback) => {
    const newBrand = new brandModel({ name, count: 0, sold: 0, image: "" });
    return newBrand.save(e => {
        return callback(e);
    })
}

exports.delete = async (id) => {
    try {
        return await brandModel.findByIdAndRemove(id);
    } catch (e) {
        console.log(e);
        return null;
    }
}

// exports.getTopList = async () => {
//     try {
//         const model = await brandModel.find().sort({ sold: -1 }).limit(3);
//         return model;
//     }
//     catch (e) {
//         console.log(e);
//         return null;
//     }
// }