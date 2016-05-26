var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var user = require('../schema/user').user;
var computer = require('../schema/computer').computer;
var shoplist = require('../schema/shoplist').shoplist;
mongoose.connect('mongodb://localhost/computer_sale');
 

//页面获取部分
/* GET home page. */
router.get('/',function(req,res){
	computer.findShow(function(err,computers){
		if(err){
			console.log(err);
		}
		var username = req.session.username;
		res.render('index',{
			title: '首页',
			username: username,
			computers: computers
		})
	})
});
 
/*login*/
router.get('/login', function(req, res){
    res.render('login', { title: 'login' });
});
router.get('/logon', function(req, res){
    res.render('login', { title: 'logon' });
});
//注销
router.get('/clear',function(req,res){
	req.session.username = '';
	console.log(req.session.username);
	res.redirect('/');
})
//详情页
router.get('/computer/:id',function(req,res){
	var id = req.params.id;
	computer.findById(id,function(err,computer){
		res.render('computer',{
			title: '详情页',
			username: req.session.username,
			computer: computer
		})
	})
});
//Lenovo列表页
router.get('/Lenovo',function(req,res){
	computer.findByType("Lenovo",function(err,computers){
		res.render('Lenovo',{
			title: "Lenovo电脑",
			username: req.session.username,
			computers: computers
		})
	})
})
//Thinkpad列表页
router.get('/Thinkpad',function(req,res){
	computer.findByType("Thinkpad",function(err,computers){
		res.render('Thinkpad',{
			title: "Thinkpad电脑",
			username: req.session.username,
			computers: computers
		})
	})
})
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
//修改列表页
router.get('/admin/list',function(req,res){
	computer.fetch(function(err,computers){
		if(err){
			console.log(err);
		}else{
			res.render('list',{
				title: '修改列表页',
				computers: computers
			})
		}
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

//用户功能部分
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
	            computer.findShow(function(err,computers){
	            	req.session.username = query_doc.username;
	            	console.log(req.session.username);
	            	res.render('index', { 
	            		title: '首页',
	            		username: req.session.username,
	            		computers: computers 
	            	});  	            	
	            })
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
//添加购物车
router.post('/shoplist',function(req,res){
	var id = req.body.id;
	if(req.session.username != undefined){
		computer.findOne({_id:id},function(err,doc){
			var username = req.session.username;
			var name = doc.name;
			var type = doc.type;
			var infor = doc.infor;
			var cost = doc.cost;
			shoplist.create({username:username, name: name, type: type, infor: infor, cost: cost},function(err,docs){
				if(err){
					console.log(err);
				}else{
					console.log("添加成功" + req.session.username);
				}
			})
		})
	}else{
		console.log('请先登录');
	}
})
//购物车删除
router.post('/shoplist/removeOne',function(req,res){
	var name = req.body.name;
	var username = req.session.username;
	shoplist.removeOne(username,name,function(err,doc){
		if(err){
			console.log(err);
		}else{
			console.log("删除成功"+ username);
			shoplist.findName(username,function(err,shoplists){
				res.render('shoplist',{
					title: '购物车',
					username: username,
					shoplists: shoplists
				})
			})
		}
	});
})
//购物车查看
router.get('/shoplist',function(req,res){
	var username = req.session.username;
	var sum = 0;
	shoplist.findName(username,function(err,shoplists){
		for(var i in shoplists){
			sum += shoplists[i].cost;
		}
		res.render('shoplist',{
			title: '购物车',
			username: username,
			shoplists: shoplists,
			sum: sum
		})
	})
});

//管理员功能部分
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
//删除商品
router.post('/admin/delete',function(req,res){
	var name = req.body.name;
	console.log(name);
	computer.removeOne(name,function(err,doc){
		computer.fetch(function(err,computers){
			if(err){
				console.log(err);
			}else{
				res.render('list',{
					title: '修改列表页',
					computers: computers
				})
			}
		})		
	});
    console.log(name);
});
module.exports = router;
