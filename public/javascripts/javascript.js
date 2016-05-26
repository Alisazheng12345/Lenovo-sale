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
    $("#login").click(function(){
        $(".login").slideDown();
    })
    $("#logon").click(function(){
        $(".logon").slideDown();
    })
    $("#logon_now").click(function(){
        $(".logon").slideDown();
        $(".login").slideUp();
    })
    $(".cancel").click(function(){
        $(".login").slideUp();
        $(".logon").slideUp();
    })
    $('.carousel').carousel({
        interval: 2000
    })
});