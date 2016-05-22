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
    $(".delete").click(function(){
        var name = $("#name").text();
        var data = {"name": name};
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/admin/computer/delete",
            dataType:'json',
            data: data,
            success: function(msg){
                console.log(msg);
            }
        });
    });
    $('.carousel').carousel({
        interval: 2000
    })
});