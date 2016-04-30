var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var shopScheMa = new Schema({
    username: String,
    name: String,
    type: String,
    cost: Number
}); 

exports.shop = mongoose.model('shoplists', userScheMa); 