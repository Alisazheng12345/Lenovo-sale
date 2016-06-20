var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var random = require('crypto');
var user = require('../schema/user').user;
var computer = require('../schema/computer').computer;
var shoplist = require('../schema/shoplist').shoplist;
var history = require('../schema/history').history;
mongoose.connect('mongodb://localhost/computer_sale');
// nodemailer
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
      service: "QQ"
    , auth: {
        user: "314339793@qq.com",
        pass: "epzgcbmharkpbieb"
    }
  });

//页面获取部分
/* GET home page. */
router.get('/',function(req,res){
	computer.findShow(function(err,computers){
		if(err){
			console.log(err);
		}
		var username = req.session.username;
		res.render('index',{
			title: '联想中国(Lenovo China)笔记本电脑,平板电脑,手机,台式机,服务器,外设数码-联想商城',
			username: username,
			computers: computers
		})
	})
});
 
//后台登陆
router.get('/admin_login',function(req,res){
	res.render('admin_login',{
		title: '联想后台登陆'
	})
})
//注销
router.get('/clear',function(req,res){
	req.session.username = '';
	console.log(req.session.username);
	res.redirect('/');
})
//详情页
router.get('/computer/:id',function(req,res){
	var id = req.params.id;
	computer.findById(id,function(err,computer_one){
		computer.findShow(function(errs,computers){
			res.render('computer',{
				title: computer_one.name,
				username: req.session.username,
				computer: computer_one,
				computers: computers
			})			
		})
	})
});
//历史页
router.get('/history',function(req,res){
	var username = req.session.username;
	history.findByUser(username,function(err,histories){
		res.render('history',{
			title: "购物历史",
			username: req.session.username,
			histories: histories
		});
	})
})
//Lenovo列表页
router.get('/Lenovo',function(req,res){
	computer.fetch(function(err,computers){
		res.render('Lenovo',{
			title: "联想Lenovo频道-联想官方网上商城，联想最新电脑，联想优惠电脑",
			username: req.session.username,
			computers: computers
		})
	})
})
//Thinkpad列表页
router.get('/Thinkpad',function(req,res){
	computer.fetch(function(err,computers){
		res.render('Thinkpad',{
			title: "ThinkPad在线商城 - ThinkWorld官方网站",
			username: req.session.username,
			computers: computers
		})
	})
})
//搜索页
router.get('/search',function(req,res){
	computer.fetch(function(err,computers){
		res.render('search',{
			title: "联想商城-搜索",
			username: req.session.username,
			computers: computers
		})
	})
})
//初始化后台
router.get('/admin',function(req,res){
	res.render('admin',{
		title: 'Lenovo后台',
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
				title: 'Lenovo商品列表',
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
				title: 'Lenovo修改商品',
				computer: computer
			})
		})
	}
});
//订单历史页
router.get('/admin/history',function(req,res){
	history.fetch(function(err,histories){
		if(err){
			console.log(err);
		}else{
			res.render('admin_history',{
				title: "订单历史",
				histories:histories
			})
		}
	})
})
//立即购买
router.post('/buy',function(req,res){
	var username = req.session.username;
	var name = req.body.name;
	var type = req.body.type;
	var infor = req.body.infor;
	var cost = req.body.cost;
	console.log(cost);
	if(req.session.username != undefined){
		history.create({username: username,name: name,type: type,infor: infor,cost: cost},function(err){
			if(err){
				console.log(err);
			}else{
				var msg = {
					success: "购买成功"
				}
				res.send(msg);
			}
		})
	}else{
		var msg = {
			success: "请先登录"
		}
		res.send(msg);
	}
})
//用户功能部分
//用户登录
router.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	user.find({username: username},function(err,docs){
		if(docs == ""){
            console.log("login failed in " + new Date());
            var msg = {
				success: "用户名不存在，请重新登录"
			};  	
            res.send(msg);
		}else{
	    	var text = eval('('+ docs +')');
	    	if(text.password == password){
	            console.log(username + ": login success in " + new Date());
	            computer.findShow(function(err,computers){
	            	req.session.username = username;
		            var msg = {
						success: 1
					};  	
		            res.send(msg);             	
	            })
	    	}else{
	            console.log("login failed in " + new Date());
	            var msg = {
					success: "密码错误"
				};  	
	            res.send(msg);  		
	    	}	 
		}
	})
})
//用户注册
var count = 0;
router.post('/logon',function(req,res){
	user.find().select('_id').exec(function(err,stus){
        count = stus.length;
	});
	var query_doc = {username: req.body.username, password: req.body.password, email: req.body.email};
	user.findOne({username:query_doc.username},function(err,docs){
		if(err){
	        res.render('warning', { title: '网络异常1' });  		
		}else if(docs){
	        res.render('warning', { title: '用户名已存在,请返回重新注册' });  
		}else{
			user.create({_id: count, username: query_doc.username, password: query_doc.password, email: query_doc.email},function(err,docs){
				if(err){
		        	res.render('warning', { title: '创建失败' }); 
		        	console.log(err);
				}else{
					// res.render('index', { title: '创建成功，请返回登录' });
					res.render('warning', { title: '登陆成功请去邮箱验证并返回登录' });
					// 设置邮件内容
					var mailOptions = {
					  from: "联想笔记本官网<314339793@qq.com>", // 发件地址
					  to: query_doc.email, // 收件列表
					  subject: "联想笔记本销售网站注册验证", // 标题
					  html: query_doc.username + "恭喜你注册成功，请返回登陆" // html 内容
					}
					// 发送邮件
					smtpTransport.sendMail(mailOptions, function(error, response){
					  if(error){
					    console.log(error);
					  }else{
					    console.log("Message sent: " + response.message);
					  }
					  smtpTransport.close(); // 如果没用，关闭连接池
					}); 
				}
			});
		}
	})
});
var code;
//修改密码
router.post('/change',function(req,res){
	var name = req.body.username;
	var password = req.body.password;
	var checkcode = req.body.code;
	if(checkcode == code){
		user.find({username:name},function(err,doc){
			if(err){
				res.render('warning',{title:'用户名不存在'});
			}else{
				user.update({username:name},{$set:{password:password}},function(err){
					if(err){
						console.log(err);
					}else{
						res.render('warning',{title:"修改成功，请返回登陆"});
					}
				})				
			}
		})
	}else{
		res.render('warning',{title:"验证码错误"})
	}
})
//发送验证码
router.post('/sendcode',function(req,res){
	var name = req.body.name;
	user.find({username:name},function(err,user){
		if(user == ""){
			res.render('warning',{title:"用户名不存在"});
		}else{
			console.log(name);
			random.randomBytes(4, function(ex, buf) {  
		    	code = buf.toString('hex');  
		    	// 设置邮件内容
				var mailOptions = {
					from: "联想笔记本官网<314339793@qq.com>", // 发件地址
					to: user[0].email, // 收件列表
					subject: "联想笔记本销售网站修改密码验证", // 标题
					html: "您的验证码是" + code // html 内容
				}
				// 发送邮件
				smtpTransport.sendMail(mailOptions, function(error, response){
					if(error){
						console.log(error);
					}else{
						console.log("Message sent: success" );
					}
						smtpTransport.close(); // 如果没用，关闭连接池
				});   
		    });  			
		}
	})
})
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
			var images = doc.images;
			shoplist.create({username:username, name: name, type: type, infor: infor, images: images,cost: cost},function(err,docs){
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
					title: '联想商城-购物车',
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
	computer.findShow(function(errs,computers){
		shoplist.findName(username,function(err,shoplists){
			res.render('shoplist',{
				title: '联想商城-购物车',
				username: username,
				shoplists: shoplists,
				computers: computers
			})
		})		
	})
});
//购物车结算
router.post('/account',function(req,res){
	var username = req.session.username;
	var name = req.body.name;
	var type = req.body.type;
	var infor = req.body.infor;
	var cost = req.body.cost;
	var name_items = name.split("/");
	var type_items = type.split("/");
	var infor_items = infor.split("/");
	var cost_items = cost.split("/");
	var length = name_items.length-1;
	for(var i=0;i<length;i++){
		history.create({username: username,name:name_items[i],type:type_items[i],infor:infor_items[i],cost:cost_items[i]},function(err){
			if(err){
				console.log(err);
			}else{
				console.log("结算成功：" + username);
			}
		})			
	}
	shoplist.removeAll(username,function(err,doc){
		if(err){
			console.log(err);
		}else{
			var msg = {
				success:"结算成功"
			};
			res.send(msg);
		}
	});
})
//搜索
router.post('/search',function(req,res){
	var value = req.body.value;
	// value = value.replace(/(^\s*)|(\s*$)/g, "");
	// value = "{$regex:/" + value + ".*/i}";
	// {"tname": {$regex:/测试.*/i}}
	console.log(value);
	// computer.findSearch(value,function(err,computers){
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		console.log(computers);
	// 		res.render('search',{
	// 			title: "联想商城-搜索",
	// 			computers: computers
	// 		})
	// 	}
	// })
	computer.find({"name": {$regex: value, $options:'i'}},function(err,computers){
		if(err){
			console.log(err);
		}else{
			console.log(computers);
			res.render('search',{
				title: "联想商城-搜索",
				computers: computers
			})
		}
	})
})

//管理员功能部分
//管理员登录
router.post('/admin_login/success', function(req, res) {
    var query_doc = {username: req.body.username, password: req.body.password};
    console.log(req.body.username);
    if(query_doc.username == "admin" && query_doc.password == "root"){
    	console.log("后台登录成功！")
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
			computer.findById(id,function(err,computer_one){
			    computer.findShow(function(err,computers){
			    	res.render('computer',{
						title: computer_one.name,
						computer: computer_one,
						computers: computers
					})
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
				title: 'Lenovo后台',
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
					title: 'Lenovo商品列表',
					computers: computers
				})
			}
		})		
	});
    console.log(name);
});
module.exports = router;
