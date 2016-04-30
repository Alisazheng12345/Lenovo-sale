var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var user = require('../schema/user').user;
var computer = require('../schema/computer').computer;
mongoose.connect('mongodb://localhost/computer_sale');
 
/* GET home page. */
router.get('/',function(req,res){
	computer.fetch(function(err,computers){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title: '首页',
			computers: computers
		})
	})
});
 
/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
router.get('/logon', function(req, res) {
    res.render('login', { title: 'logon' });
});
//用户登录
router.post('/index', function(req, res) {
    var query_doc = {username: req.body.username, password: req.body.password};
    user.find({username:query_doc.username},function(err,docs){
    	if(docs == ""){
            console.log("login failed in " + new Date());
            res.render('homepage', { title: '用户名不存在' });   	
    	}else{
	    	var text = eval('('+ docs +')');
	    	if(text.password == query_doc.password){
	            console.log(query_doc.username + ": login success in " + new Date());
	            res.render('homepage', { title: '登陆成功' });    		
	    	}else{
	            console.log("login failed in " + new Date());
	            res.render('homepage', { title: '登陆失败' });    		
	    	}	    		
    	}
    });
});
//用户注册
var count = 0;
router.post('/logon',function(req,res){
	user.find().select('_id').exec(function(err,stus){
        count = stus.length;
	});
	var query_doc = {username: req.body.username, password: req.body.password, phone: req.body.phone};
	user.findOne({username:query_doc.username},function(err,docs){
		if(err){
	        res.render('logon', { title: '网络异常1' });  		
		}else if(docs){
	        res.render('logon', { title: '用户名已存在' });  
		}else{
			user.create({_id: count, username: query_doc.username, password: query_doc.password, phone: query_doc.phone},function(err,docs){
				if(err){
		        	res.render('logon', { title: '网络异常2' });  
		        	console.log(err);
				}else{
					res.render('logon', { title: '创建成功，请返回登录' }); 
				}
			});
		}
	})
});
//详情页
router.get('/computer/:id',function(req,res){
	var id = req.params.id;
	computer.findById(id,function(err,computer){
		res.render('computer',{
			title: '详情页',
			computer: computer
		})
	})
});
//修改列表页
router.get('/admin/list',function(req,res){
	computer.fetch(function(err,computers){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title: '修改列表页',
			computers: computers
		})
	})
});
//单独修改页
router.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	if(id){
		computer.findById(id,function(err,computer){
			res.render('update',{
				title: '修改',
				computer: computer
			})
		})
	}
});
//修改商品
router.post('/admin/update/success',function(req,res){
	var id = req.body.id;
	var name = req.body.name;
	var type = req.body.type;
	var infor = req.body.infor;
	var serie = req.body.serie;
	var cost = req.body.cost;
	var posters = req.body.posters;
	var images = req.body.images;
	var show = req.body.show;
	var cpu_name = req.body.cpu_name;
	var cpu_speed = req.body.cpu_speed;
	var cpu_type = req.body.cpu_type;
	var system = req.body.system;
	var show_size = req.body.show_size;
	var show_type = req.body.show_type;
	var xian_type = req.body.xian_type;
	var pan_size = req.body.pan_size;
	var ram_type = req.body.ram_type;
	var ram_size = req.body.ram_size;
	var port_type = req.body.port_type;
	var port_amount = req.body.port_amount;
	var listen_type = req.body.listen_type;
	var power_type = req.body.power_type;
	var power_time = req.body.power_time;
	var size = req.body.size;
	var weight = req.body.weight;
	computer.update({_id: id},{$set:{name: name, type: type, infor: infor, serie: serie, cost: cost, posters: posters, images: images, show: show, cpu_name: cpu_name, cpu_speed: cpu_speed, cpu_type: cpu_type, system: system, show_size: show_size, show_type: show_type, xian_type: xian_type, pan_size:pan_size, ram_type:ram_type, ram_size:ram_size, port_type: port_type, port_amount: port_amount, listen_type: listen_type, power_type: power_type, power_time: power_time, size: size, weight: weight}},function(err,docs){
		if(err){
			console.log(err);
		}else{
			computer.findById(id,function(err,computer){
				res.render('computer',{
					title: '详情页',
					computer: computer
				})
			})
		}
	})
});
//添加商品
router.post('/admin/computer/new',function(req,res){
	var name = req.body.name;
	var type = req.body.type;
	var infor = req.body.infor;
	var serie = req.body.serie;
	var cost = req.body.cost;
	var posters = req.body.posters;
	var images = req.body.images;
	var show = req.body.show;
	var cpu_name = req.body.cpu_name;
	var cpu_speed = req.body.cpu_speed;
	var cpu_type = req.body.cpu_type;
	var system = req.body.system;
	var show_size = req.body.show_size;
	var show_type = req.body.show_type;
	var xian_type = req.body.xian_type;
	var pan_size = req.body.pan_size;
	var ram_type = req.body.ram_type;
	var ram_size = req.body.ram_size;
	var port_type = req.body.port_type;
	var port_amount = req.body.port_amount;
	var listen_type = req.body.listen_type;
	var power_type = req.body.power_type;
	var power_time = req.body.power_time;
	var size = req.body.size;
	var weight = req.body.weight;
	computer.findOne({name:name},function(err,docs){
		if(!docs){
			computer.create({name: name, type: type, infor: infor, serie: serie, cost: cost, posters: posters, images: images, show: show, cpu_name: cpu_name, cpu_speed: cpu_speed, cpu_type: cpu_type, system: system, show_size: show_size, show_type: show_type, xian_type: xian_type, pan_size:pan_size, ram_type:ram_type, ram_size:ram_size, port_type: port_type, port_amount: port_amount, listen_type: listen_type, power_type: power_type, power_time: power_time, size: size, weight: weight},function(err,docs){
				if(err){
				    console.log(err);
				}else{
					computer.findOne({name:name},function(err,doc){
						res.redirect('/computer/' + doc._id); 
					})
				}
			});
		}else{
			res.render('admin',{
				title: '后台',
				warning: '已有此商品',
				computer: {
					name: '',
					type: ''
				}
			})
		}
	});
})
//修改商品

//初始化后台
router.get('/admin',function(req,res){
	res.render('admin',{
		title: '后台',
		computer: {
			name: '',
			type: ''
		}
	})
})
module.exports = router;
