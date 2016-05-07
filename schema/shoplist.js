var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var shopScheMa = new Schema({
    username: String,
    name: String,
    type: String,
    infor: String,
    cost: Number
}); 

shopScheMa.statics = {
	findName: function(username,cb){
		return this
		.find({username: username})
		.exec(cb);
	},
	removeOne: function(username,name,cb){
		return this
		.remove({username: username,name: name})
		.exec(cb);
	},
	removeAll: function(username,cb){
		return this
		.remove({username: username})
		.exec(cb);
	}
}

exports.shoplist = mongoose.model('shoplists', shopScheMa); 