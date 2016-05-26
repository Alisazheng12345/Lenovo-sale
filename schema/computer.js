var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var compScheMa = new Schema({
	name: String,//名称
	type: String,//类型
	infor: String,//简介
	serie: String,//系列
	cost: Number,//价格
	posters: String,
	images: String,
	show: Number,//1在首页显示 0不显示
	cpu_name: String,
	cpu_speed: String,
	cpu_type: String,
	system: String,
	show_size: String,
	show_type: String,
	xian_type: String,
	pan_size: String,
	ram_type: String,
	ram_size: String,
	port_type: String,
	port_amount: String,
	listen_type: String,
	power_type: String,
	power_time: String,
	size: String,
	weight: String,
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
compScheMa.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

compScheMa.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb);
	},
	findById: function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb);
	},
	findByType: function(type,cb){
		return this
		.find({type: type})
		.sort('meta.updateAt')
		.exec(cb);
	},
	findShow: function(cb){
		return this
		.find({show: 1})
		.sort('meta.updateAt')
		.exec(cb);
	},
	removeOne: function(name,cb){
		return this
		.remove({name: name})
		.exec(cb);
	}
}
exports.computer = mongoose.model('computers', compScheMa); //  与users集合关联
// module.exports = compSchema;