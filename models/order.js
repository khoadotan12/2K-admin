const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const OrderSchema = new Schema({
    userID: ObjectId,
    create: Date,
    done: Date,
    status: Number,
    address: String,
    ward: String,
    district: String,
    items: {
        type: [{
            productID: ObjectId,
            count: Number,
        }]
    },
    price: Number
});
const orderModel = mongoose.model('orders', OrderSchema);
const userModel = require('./user');

exports.add = (order, callback) => {
    const newOrder = new orderModel(order);
    console.log(order);
    console.log(newOrder);
    return newOrder.save(e => {
        return callback(e);
    })
};

exports.list = async (status) => {
    try {
        const orders = await orderModel.find({ status });
        const result = orders.map(async (order) => {
            const user = await userModel.getID(order._doc.userID);
            if (user) {
                order._doc.email = user.email;
                order._doc.phone = user.phone;
            }
            const dateCreated = new Date(order._doc.create);
            order._doc.create = dateCreated.toLocaleString('en-US');
            if (status === 2 || status === -1) {
                const dateDone = new Date(order._doc.done);
                order._doc.done = dateDone.toLocaleString('en-US');
            }
            return order._doc;
        });
        return await Promise.all(result);
    }
    catch (e) {
        return null;
    }
};

exports.setState = async (id, state) => {
    try {
        if (state === 2 || state === -1) {
            const moment = new Date();
            return await orderModel.findByIdAndUpdate(id, { status: state, done: moment });
        }
        return await orderModel.findByIdAndUpdate(id, { status: state });
    } catch (e) {       
        return null;
    }
};
exports.delete = async (id) => {
    try {
        return await orderModel.findByIdAndRemove(id);
    } catch (e) {
        return null;
    }
};

exports.getID = async (id) => {
    try {
        return await orderModel.findById(id);
    } catch (e) {
        return null;
    }
};

exports.edit = async (id, data) => {
    try {
        return await orderModel.findByIdAndUpdate(id, data);
    } catch (e) {
        return null;
    }
};