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
        var flag = window.confirm("总价是："+money+"是否结算？");
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
    })
    $(".common_spread").click(function(){
        $(".common_hide").slideToggle();
    })
    $(".light_spread").click(function(){
        $(".light_hide").slideToggle();
    })
    $(".hot_spread").click(function(){
        $(".hot_hide").slideToggle();
    })
    $(".game_spread").click(function(){
        $(".game_hide").slideToggle();
    })
    $(".change_spread").click(function(){
        $(".change_hide").slideToggle();
    })
    $(".x_spread").click(function(){
        $(".x_hide").slideToggle();
    })
    $(".t_spread").click(function(){
        $(".t_hide").slideToggle();
    })
    $(".s_spread").click(function(){
        $(".s_hide").slideToggle();
    })
    $(".p_spread").click(function(){
        $(".p_hide").slideToggle();
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