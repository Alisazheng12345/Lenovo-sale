window.onload = function(){
    var nameValue = document.getElementById("name");
    var nameInfor = document.getElementById("nameRemind");
    var passwordValue = document.getElementById("password");
    var passwordInfor = document.getElementById("passwordRemind");
    var sureValue = document.getElementById("sure");
    var sureInfor = document.getElementById("sureRemind");
    var emailValue = document.getElementById("email");
    var emailInfor = document.getElementById("emailRemind");
    var submit = document.getElementById("submit");
    var submit_parent = submit.parentNode;
    var changeName = document.getElementById("change_name");
    var changePassword = document.getElementById("change_password");
    var changeSure = document.getElementById("change_sure");
    var cName = document.getElementById("c_name");
    var cPassword = document.getElementById("c_password");
    var cSure = document.getElementById("c_sure");
    var cSubmit = document.getElementById("change_submit");
    var cSubmit_parent = cSubmit.parentNode;
    var lengthTest = /^.{4,16}$/;
    var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
    var trimReg = /^\s+|\s$/g;
    var emailReg = /^\w+(\.\w+)*@\w+(\.\w+)+$/i;
    var phoneReg = /^1(3|4|5|7|8)\d{9}$/;
    var flag = [0,0,0,0];
    var change_flag = [0,0,0];
    var shoplist = document.getElementById("shoplist");
    var buy = document.getElementById("buy");
    var infors = {
        name:{
            "remind":"必填，长度为4~16位字符",
            "null":"用户名不能为空",
            "error":"格式不符，请重新输入",
            "right":"姓名可用"
        },
        password:{
            "remind":"必填，长度为4~16位字符",
            "null":"为空，请重新输入",
            "error":"格式不符，请重新输入",
            "right":"密码可用"
        },
        sure:{
            "remind":"请重新输入密码",
            "null":"为空，请重新输入",
            "length":"格式不符，请重新输入",
            "error":"与密码不符，请重新输入",
            "right":"密码一致"
        },
        email:{
            "remind":"请输入您的邮箱",
            "null":"为空，请重新输入",
            "error":"格式不符，请重新输入",
            "right":"邮箱可用"
        }
    }
    addEvent(nameValue,"focus",function(){
        var param = infors.name;
        nameInfor.innerHTML = param.remind;
        nameValue.parentNode.className = "form-group";
    });
    addEvent(nameValue,"blur",function(){
        flag[0] = 0;
        var param = infors.name;
        var nameStr = nameValue.value.replace(trimReg,'').replace(chineseReg,'--');
        if(nameStr == ""){
            nameInfor.innerHTML = param.null;
            // nameValue.parentNode.className = "error";
            var classVal = nameValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            nameValue.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(nameStr)){
            nameInfor.innerHTML = param.error;
            // nameValue.parentNode.className = "error";
            var classVal = nameValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            nameValue.parentNode.setAttribute("class",classVal );
        }else{
            nameInfor.innerHTML = param.right;
            var classVal = nameValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            nameValue.parentNode.setAttribute("class",classVal );
            flag[0] = 1;
        }
    });
    //修改密码的用户名
    addEvent(changeName,"focus",function(){
        var param = infors.name;
        cName.innerHTML = param.remind;
        cName.parentNode.className = "form-group";
    });
    addEvent(changeName,"blur",function(){
        change_flag[0] = 0;
        var param = infors.name;
        var nameStr = changeName.value.replace(trimReg,'').replace(chineseReg,'--');
        if(nameStr == ""){
            cName.innerHTML = param.null;
            // nameValue.parentNode.className = "error";
            var classVal = changeName.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changeName.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(nameStr)){
            cName.innerHTML = param.error;
            // nameValue.parentNode.className = "error";
            var classVal = changeName.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changeName.parentNode.setAttribute("class",classVal );
        }else{
            cName.innerHTML = param.right;
            var classVal = changeName.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            changeName.parentNode.setAttribute("class",classVal );
            change_flag[0] = 1;
        }
    });
    addEvent(passwordValue,"focus",function(){
        var param = infors.password;
        passwordInfor.innerHTML = param.remind;
        passwordValue.parentNode.className = "form-group";
    });
    addEvent(passwordValue,"blur",function(){
        flag[1] = 0;
        var param = infors.password;
        var passwordStr = passwordValue.value.replace(trimReg,'');
        if(passwordStr == ""){
            passwordInfor.innerHTML = param.null;
            var classVal = passwordValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            passwordValue.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(passwordStr)){
            passwordInfor.innerHTML = param.error;
            var classVal = passwordValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            passwordValue.parentNode.setAttribute("class",classVal );
        }else{
            passwordInfor.innerHTML = param.right;
            var classVal = passwordValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            passwordValue.parentNode.setAttribute("class",classVal );
            flag[1] = 1;
        }
    });
    //修改密码的密码
    addEvent(changePassword,"focus",function(){
        var param = infors.password;
        cPassword.innerHTML = param.remind;
        changePassword.parentNode.className = "form-group";
    });
    addEvent(changePassword,"blur",function(){
        change_flag[1] = 0;
        var param = infors.password;
        var passwordStr = changePassword.value.replace(trimReg,'');
        if(passwordStr == ""){
            cPassword.innerHTML = param.null;
            var classVal = changePassword.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changePassword.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(passwordStr)){
            cPassword.innerHTML = param.error;
            var classVal = changePassword.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changePassword.parentNode.setAttribute("class",classVal );
        }else{
            cPassword.innerHTML = param.right;
            var classVal = changePassword.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            changePassword.parentNode.setAttribute("class",classVal );
            change_flag[1] = 1;
        }
    });
    addEvent(sureValue,"focus",function(){
        var param = infors.sure;
        sureInfor.innerHTML = param.remind;
        sureValue.parentNode.className = "form-group";
    });
    addEvent(sureValue,"blur",function(){
        flag[2] = 0;
        var param = infors.sure;
        var sureStr = sureValue.value;
        if(sureStr == ""){
            sureInfor.innerHTML = param.null;
            var classVal = sureValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            sureValue.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(sureStr)){
            sureInfor.innerHTML = param.length;
            var classVal = sureValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            sureValue.parentNode.setAttribute("class",classVal );
        }else if(sureStr !== passwordValue.value){
            sureInfor.innerHTML = param.error;
            var classVal = sureValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            sureValue.parentNode.setAttribute("class",classVal );
        }else{
            sureInfor.innerHTML = param.right;
            var classVal = sureValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            sureValue.parentNode.setAttribute("class",classVal );
            flag[2] = 1;
        }
    });
    //修改密码的确认
    addEvent(changeSure,"focus",function(){
        var param = infors.sure;
        cSure.innerHTML = param.remind;
        changeSure.parentNode.className = "form-group";
    });
    addEvent(changeSure,"blur",function(){
        change_flag[2] = 0;
        var param = infors.sure;
        var sureStr = changeSure.value;
        if(sureStr == ""){
            cSure.innerHTML = param.null;
            var classVal = changeSure.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changeSure.parentNode.setAttribute("class",classVal );
        }else if(!lengthTest.test(sureStr)){
            cSure.innerHTML = param.length;
            var classVal = changeSure.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changeSure.parentNode.setAttribute("class",classVal );
        }else if(sureStr !== changePassword.value){
            cSure.innerHTML = param.error;
            var classVal = changeSure.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            changeSure.parentNode.setAttribute("class",classVal );
        }else{
            cSure.innerHTML = param.right;
            var classVal = changeSure.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            changeSure.parentNode.setAttribute("class",classVal );
            change_flag[2] = 1;
        }
    });
    addEvent(emailValue,"focus",function(){
        var param = infors.email;
        emailInfor.innerHTML = param.remind;
        emailValue.parentNode.className = "form-group";
    });
    addEvent(emailValue,"blur",function(){
        flag[3] = 0;
        var param = infors.email;
        var emailStr = emailValue.value;
        if(emailStr == ""){
            emailInfor.innerHTML = param.null;
            var classVal = emailValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            emailValue.parentNode.setAttribute("class",classVal );
        }else if(!emailReg.test(emailStr)){
            emailInfor.innerHTML = param.error;
            var classVal = emailValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" error");
            emailValue.parentNode.setAttribute("class",classVal );
        }else{
            emailInfor.innerHTML = param.right;
            var classVal = emailValue.parentNode.getAttribute("class");
            classVal = classVal.concat(" correct");
            emailValue.parentNode.setAttribute("class",classVal );
            flag[3] = 1;
        }
    });
    addEvent(submit_parent.parentNode,"mousemove",function(){
        var con = 0;
        for(var i=0;i<4;i++){
            if(flag[i] == 0){
                con = 0;
                break;
            }else{
                con = 1;
            }
        }
        if(con == 1){
            submit.disabled = false;
        }else{
            submit.disabled = true;
        }
    });
    // submit_parent.parentNode.addEventListener("mousemove",function(){
    //     var con = 0;
    //     for(var i=0;i<4;i++){
    //         if(flag[i] == 0){
    //             con = 0;
    //             break;
    //         }else{
    //             con = 1;
    //         }
    //     }
    //     if(con == 1){
    //         submit.disabled = false;
    //     }else{
    //         submit.disabled = true;
    //     }
    // });
    addEvent(cSubmit_parent.parentNode,"mousemove",function(){
        var con = 0;
        for(var i=0;i<3;i++){
            if(change_flag[i] == 0){
                con = 0;
                break;
            }else{
                con = 1;
            }
        }
        if(con == 1){
            cSubmit.disabled = false;
        }else{
            cSubmit.disabled = true;
        }
    });
    addEvent(shoplist,"click",function(){
        var username = document.getElementById("username");
        if(!username){
            alert("请先点击右上角登录/注册");
        }else{
            alert("加入购物车成功，请进入购物车查看");
        }
    })
}
//浏览器兼容
function addEvent(ele,event,fn){
    try{
        ele.addEventListener(event,fn,false);
    }
    catch(e){
        try{
            ele.attachEvent("on" + event,fn);
        }
        catch(e){
            ele["on" + event] = fn;
        }
    }
}