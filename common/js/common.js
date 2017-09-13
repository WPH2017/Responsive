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
})(jQuery);

//将类别和id对应表存入本地
(function ($) {
    if(localStorage.getItem('classList')) return;
    var classList={};//保存字典
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
            });
        }
    });
})(jQuery);