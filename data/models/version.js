const mongoose = require('../mongoose_connect');
const Schema = mongoose.Schema;

var Model = mongoose.model('versions', new Schema({
    projectName: String,
    version: String,
    createTime: Date,
    status: String,
    branchUrl: String
}));

module.exports = Model;
