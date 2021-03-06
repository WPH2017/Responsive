
//头部导航
(function ($) {
    "use strict";
    /*----------------------------
     头部导航 JS
   ------------------------------ */
    $(".slide-toggle").on('click', function () {
        $(".show-toggle").slideToggle();
        $(".show-toggle-2").css("display", "none");
        $(".show-toggle-3").css("display", "none");
    });

    $(".slide-toggle-2").on('click', function () {
        $(".show-toggle-2").slideToggle();
        $(".show-toggle").css("display", "none");
        $(".show-toggle-3").css("display", "none");
    });

    $(".slide-toggle-3").on('click', function () {
        $(".show-toggle-3").slideToggle();
        $(".show-toggle").css("display", "none");
        $(".show-toggle-2").css("display", "none");
    });

    $('#showlogin').on('click', function () {
        $('#checkout-login').slideToggle(900);
    });

    $('#showcoupon').on('click', function () {
        $('#checkout_coupon').slideToggle(900);
    });

    $('#cbox').on('click', function () {
        $('#cbox_info').slideToggle(900);
    });

    $('#ship-box').on('click', function () {
        $('#ship-box-info').slideToggle(1000);
    });

    /*----------------------------
     jQuery mainmenu
    ------------------------------ */
    $(".product-menu-title").on("click", function () {
        $(".product_vmegamenu").slideToggle(500);
    });
    
})(jQuery);

// 回到顶部
$(window).scroll(function(){
    var sc=$(window).scrollTop();
    if(sc>0){
     $("#scrollUp").css("display","block");
    }else{
    $("#scrollUp").css("display","none");
    }
  });

$("#scrollUp").click(function(){
    // var sc=$(window).scrollTop();
    //TODO:浏览器检测，body或者html
    var user=navigator.userAgent;
    if(/Chrome/.test(user)){
        $('body').animate({scrollTop:0},500);
        $('html').animate({scrollTop:0},500);
    }else if(/Firefox/.test(user)){
        $('body').animate({scrollTop:0},500);
        $('html').animate({scrollTop:0},500);
    }
});

//将类别和id对应表存入本地并将数据导入搜索条件中
(function ($) {
    if(localStorage.getItem('classList')) return;
    const classList={};//保存字典
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cat.php",
        "type":"GET",
        "success":function (json) {
            $(json.data).each(function () {
                var name=$(this)[0].cat_name;
                var tid=$(this)[0].cat_id;
                //将类别名称存入类别id中
                classList[$(this)[0].cat_id]=$(this)[0].cat_name;
                localStorage.setItem('classList',JSON.stringify(classList));
                //导入搜索条件
                $('#select').html(function () {
                    var html=`<option value="0">所有类别</option>`;
                    for(var key in classList){
                        console.log(key)
                        html+=`<option value="${key}">${classList[key]}</option>`;
                    }
                    return html;
                })
            });
        }
    });
})(jQuery);

// 搜索
(function ($) {
    var word=$('header .search-box form input');

    word.keypress(function (event) {
        if(event.keyCode===13){
            search();
        }
    });

    $('header .search-box form button').click(search);

//    搜索业务函数
    function search() {
        if(!word.val()){
            alert("请输入内容");
            return;
        }
        var encodeWrd=encodeURIComponent(word.val());
        //TODO：延迟
        setTimeout(function () {
            location.href='./search_result.html?wrd='+encodeWrd;
        },1);
    }

//    绑定获取搜索条件
    $('#select').click(function () {
        console.log(this);
    });
})(jQuery);

var deleteToken=function () {
    localStorage.clear();
};
//过期24小时delete
var checkTime=function (limit=24*3600*1000) {
    var oldTime=localStorage.getItem('timestamp');
    if(oldTime){
        if(Date.parse(new Date())-oldTime>limit){
            deleteToken();
        }
    }
};


//获取token全局方法
var getToken=function () {
    var token;
    if(token=localStorage.getItem('token')){
        $('.mainmenu-area .mainmenu li').eq(4).html('<button><a href="./order.html">'+localStorage.getItem('username')+' 的账户</a></button> <button class="logout">注销</button>');
        $('button.logout').click(function () {
            if(confirm('确定要注销当前账户吗？')) {
                deleteToken();
                $('.mainmenu-area .mainmenu li').eq(4).html(`<a href="login.html">登录</a>`);
            }
        });
        return token;
    }else{
        if(confirm('您还未登录，是否跳转到登录页面')){
            location.href='login.html#callback='+location.href;
        }
    }
};

//添加到购物车业务函数
var addToCart=function (goods_id,number=1) {
    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_cart.php?token='+getToken(),
        type:'POST',
        data:{
            goods_id:goods_id,
            number:number
        },
        success:function (response) {
            if(response.code===0){
                alert('已添加到购物车~');
                updateCart(function (html) {
                    $('#cart-list').html(html);
                    //样式部分
                    $('#cart-list').parent().addClass('active');
                    setTimeout(function () {
                        $('#cart-list').parent().removeClass('active');
                    },2000);
                });
            }
        }
    });
};

// 侧边栏购物车信息更新
var updateCart=function (callback) {
    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_cart.php',
        type:'GET',
        data:{
            token:localStorage.getItem('token')
        },
        success:function (response) {
            if(response.code===0){
                var html='';
                var dataArr=response.data;
                for(var i=0;i<dataArr.length;i++){
                    var data=dataArr[i];
                    if(i>4){
                        html+=`
                           <div class="more">
                                <a href="./cart.html"> · · · · 更多 · · · · </a>
                            </div> 
                        `;
                        break;
                    }
                    html+=`
                        <div class="cart-item">
                            <a href="detail.html?cat_id=${data.cat_id}&goods_id=${data.goods_id}"><img src="${data.goods_thumb}" alt=""></a>
                            <span>${data.goods_name}</span><br>
                            <span>${data.goods_price}</span>
                            <span> * ${data.goods_number} 件</span><br>
                            <span>总价：￥${data.goods_price*data.goods_number} 元</span>
                        </div>
                    `;

                }
                html+=`<a href="cart.html"><div class="run-to-cart">查看我的购物车</div></a>`;
                if(callback) callback(html);
            }
        }
    });
};
(function ($) {
    if(!localStorage.getItem('token')) return;

    var token=getToken();

    //初始化
    updateCart(function (html) {
        $('<div id="cart-list"></div>').appendTo($('#social_block .cart')).wrapInner($(html));
    });
})(jQuery);

//绑定添加到按钮更新操作
var bindAddToCart=function (obj) {
    obj.click(function () {
        var goods_id=$(this).attr('data-goods-id');
        addToCart(goods_id);
    });
};
