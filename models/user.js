const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    ward: String,
    district: String,
});
const userModel = mongoose.model('brands', UserSchema);

exports.add = (user, callback) => {
    const newUser = new userModel(user);
    return newUser.save(e => {
        return callback(e);
    })
}