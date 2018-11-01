const mongoose = require('mongoose');

mongoose.connect('mongodb://spadmin:spadmin360@localhost:27017/simple_admin');

module.exports = mongoose;
