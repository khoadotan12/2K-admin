const mongoose = require('mongoose');

const { modsSchemaName } = require('../global');

const Schema = mongoose.Schema;
const moderatorSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
});
const moderatorModel = mongoose.model(modsSchemaName, moderatorSchema);

exports.add = (moderator, callback) => {
    const newmoderator = new moderatorModel(moderator);
    return newmoderator.save(e => {
        return callback(e);
    })
};

exports.list = async () => {
    try {
        const moderators = await moderatorModel.find();
        return moderators;
    }
    catch (e) {
        return null;
    }
};

exports.delete = async (id) => {
    try {
        return await moderatorModel.findByIdAndRemove(id);
    } catch (e) {
        return null;
    }
};

exports.getID = async (id) => {
    try {
        return await moderatorModel.findById(id);
    } catch (e) {
        return null;
    }
};

exports.edit = async (id, data) => {
    try {
        return await moderatorModel.findByIdAndUpdate(id, data);
    } catch (e) {
        return null;
    }
};

exports.getEmail = async (email) => {
    try {
        return await moderatorModel.findOne({ email });
    } catch (e) {
        return null;
    }
}