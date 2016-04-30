var mongoose = require('mongoose');
var compSchema = require('../schemas/computer');
var Computer = mongoose.model('computers', compSchema);

module.exports = Computer;