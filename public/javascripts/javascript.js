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
    $('.carousel').carousel({
        interval: 2000
    })
});