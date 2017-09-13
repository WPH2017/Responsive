//点击切换
$('#change-to-reg').click(function () {
   $('.login-box').fadeOut();
   $('.register-box').fadeIn();
});
$('#change-to-login').click(function () {
    $('.login-box').fadeIn();
    $('.register-box').fadeOut();
});

//点击登录
var login=function () {
    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        url: 'http://h6.duchengjiu.top/shop/api_user.php',
        type: 'POST',
        data: {
            "status": "login",
            "username": username,
            "password": password
        },
        success: function (response) {
            if (response.code === 0) {
                var data = response.data;
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        localStorage.setItem(prop, data[prop]);
                    }
                    //如果有hash则获得hash
                    location.href=location.hash?location.hash.substr(10):"index.html";
                }
            }
        }
    });
};
$('#login').click(login);

$('#register').click(function () {
    var username=$('#reg-username').val();
    var password=$('#reg-password').val();
    var repassword=$('#reg-repassword').val();

    if(repassword!=password){
        alert("两次密码不对~");
        return;
    }
    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_user.php',
        type:'POST',
        data:{
            "status":"register",
            "username": username,
            "password":password
        },
        success:function (response) {
            if(response.code===0){
                alert("注册成功，点击后开始自动登录~")
                login();
            }
        }
    });

});

