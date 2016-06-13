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
        var flag = window.confirm(money+"是否结算？");
        if(flag){
            console.log(flag);
            $.ajax({
                type: "POST",
                url: "/account",
                dataType: "json",
                success: function(msg){
                    alert(msg.success);
                    window.location.reload();
                }
            });
        }
    });
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