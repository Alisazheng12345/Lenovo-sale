var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var hisScheMa = new Schema({
	username: String,
	name: String,
	type: String,
	infor: String,
	cost: Number,
	createAt:{
		type: Date,
		default: Date.now()
	}
});

hisScheMa.pre('save',function(next){
	this.createAt = Date.now();
	next();
})

hisScheMa.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('createAt')
		.exec(cb);
	},
	findByUser: function(username,cb){
		return this
		.find({username: username})
		.sort('createAt')
		.exec(cb);
	}
}
exports.history = mongoose.model('history',hisScheMa);