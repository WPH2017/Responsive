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
var login=function (username,password) {
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
                }
                // 记录时间戳
                localStorage.setItem('timestamp',Date.parse(new Date()));
                //如果有hash则获得hash
                if(confirm("登录成功！\n点击 “确认” -----> 将在2秒后跳转回原先页面\n 点击“取消” -----> 将停留在当前页面")){
                    setTimeout(function(){
                        location.href=location.hash?location.hash.substr(10):"index.html";
                    },2000);
                }
            }
        }
    });
};
$('#login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    login(username,password);
});

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
                alert("注册成功，点击后开始自动登录~");
                login(username,password);
            }
        }
    });

});

