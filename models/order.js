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

exports.add = (user, callback) => {
    const newUser = new orderModel(user);
    return newUser.save(e => {
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
            return order._doc;
        });
        return await Promise.all(result);
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

exports.cancel = async (id) => {
    try {
        return await orderModel.findByIdAndUpdate(id, { status: -1 });
    } catch (e) {
        console.log(e);
        return null;
    }
};

exports.setState = async (id, state) => {
    try {
        return await orderModel.findByIdAndUpdate(id, { status: state });
    } catch (e) {
        console.log(e);
        return null;
    }
};
exports.delete = async (id) => {
    try {
        return await orderModel.findByIdAndRemove(id);
    } catch (e) {
        console.log(e);
        return null;
    }
};

exports.getID = async (id) => {
    try {
        return await orderModel.findById(id);
    } catch (e) {
        console.log(e);
        return null;
    }
};

exports.edit = async (id, data) => {
    try {
        return await orderModel.findByIdAndUpdate(id, data);
    } catch (e) {
        console.log(e);
        return null;
    }
};