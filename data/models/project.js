const mongoose = require('../mongoose_connect');
const Schema = mongoose.Schema;

var model = mongoose.model('projects', new Schema({
    name: {type: String, unique: true},
    svnRoot: String,
    localRes: String,
    localScripts: String,
    devRes: String,
    devScripts: String,
    productRes: String,
    productScripts: String
}));

module.exports = model;
