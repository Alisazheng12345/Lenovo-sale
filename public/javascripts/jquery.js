$(document).ready(function(){
    $("#shoplist").click(function(){
        var id = $("#id").text();
        var data = {"id": id};
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/shoplist",
            dataType:'json',
            data: data,
            success: function(msg){
                alert(msg);
            }
        });
    });
    $("#checkCode").click(function(){
        var name = $("#change_name").val();
        var data = {"name": name};
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/sendcode",
            dataType:'json',
            data: data,
            success: function(msg){
                alert(msg);
            }
        });
    });
    $("#sum").click(function(){
        var money = $(".sum").text();
        var reg = /[^0-9]+/g;
        var str = money;
        str = str.replace(reg, '');
        if(str == 0){
            alert("购物车为空!");
            return 0;
        }
        var length = $(".count").length;
        var name_item = $(".nameVal");
        var type_item = $(".typeVal");
        var infor_item = $(".inforVal");
        var cost_item = $(".costVal");
        var history = {
            name:"",
            type:"",
            infor:"",
            cost: ""
        };
        for(var i=0;i<length;i++){
            var name = name_item[i].textContent;
            var type = type_item[i].textContent;
            var infor = infor_item[i].textContent;
            var cost = cost_item[i].textContent;
            history.name += name + "/";
            history.type += type + "/";
            history.infor += infor + "/";
            history.cost += cost + "/";           
        }
        console.log(history);
        var flag = window.confirm("总价是："+money+"是否结算？");
        if(flag){
            console.log(flag);
            $.ajax({
                type: "POST",
                url: "/account",
                dataType: "json",
                data: history,
                success: function(msg){
                    alert(msg.success);
                    window.location.reload();
                }
            });
        }
    });
    $("#buy").click(function(){
        var flag = window.confirm("确定购买？");
        if(flag){
            var name = $("#buy_name").text();
            var type = $("#buy_type").text();
            var infor = $("#buy_infor").text();
            var cost = $("#buy_cost").text();
            var data = {"name": name,"type": type,"infor": infor,"cost": cost};
            $.ajax({
                type: "POST",
                url: "/buy",
                dataType: "json",
                data: data,
                success: function(msg){
                    alert(msg.success);
                }
            })            
        }
    })
    $("#login_submit").click(function(){
        var username = $("#login_username").val();
        var password = $("#login_password").val();
        var data = {"username":username,"password":password};
        $.ajax({
            type: "POST",
            url: "/login",
            dataType: "json",
            data: data,
            success: function(msg){             
                if(msg.success == 1){
                    window.location.reload();
                }else{
                    $("#login_msg").empty();
                    $("#login_msg").append(msg.success);                     
                }                   
            }
        })
    })
    // $("#search_btn").click(function(){
    //     var searchVal = $("#search").val();
    //     searchVal = searchVal.replace(/(^\s*)|(\s*$)/g, "");
    //     var data = {"value":searchVal};
    //     alert(data);
    //     $.ajax({
    //         type: "POST",
    //         url: "/usersearch",
    //         dataType: "json",
    //         data: data,
    //         success: function(msg){
    //             console.log(msg.success);
    //         }
    //     })
    // })
    $("#login_username,#login_password").focus(function(){
        $("#login_msg").empty();
    });
    $(".common_spread").click(function(){
        $(".common_hide").stop().slideToggle();
    })
    $(".light_spread").click(function(){
        $(".light_hide").stop().slideToggle();
    })
    $(".hot_spread").click(function(){
        $(".hot_hide").stop().slideToggle();
    })
    $(".game_spread").click(function(){
        $(".game_hide").stop().slideToggle();
    })
    $(".change_spread").click(function(){
        $(".change_hide").stop().slideToggle();
    })
    $(".x_spread").click(function(){
        $(".x_hide").stop().slideToggle();
    })
    $(".t_spread").click(function(){
        $(".t_hide").stop().slideToggle();
    })
    $(".s_spread").click(function(){
        $(".s_hide").stop().slideToggle();
    })
    $(".p_spread").click(function(){
        $(".p_hide").stop().slideToggle();
    })
    $("#login").click(function(){
        $(".logon").slideUp();
        $(".login").slideDown();
        $(".change").slideUp();
    })
    $("#logon").click(function(){
        $(".change").slideUp();
        $(".logon").slideDown();
    })
    $("#logon_now").click(function(){
        $(".logon").slideDown();
        $(".login").slideUp();
    })
    $(".cancel").click(function(){
        $(".login").slideUp();
        $(".logon").slideUp();
        $(".change").slideUp();
    })
    $(".forget").click(function(){
        $(".change").slideDown();
    })
    $('.carousel').carousel({
        interval: 2000
    })
});