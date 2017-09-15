//通过location.search获取get传参的数据 截取？后面的内容
var str = location.search.substr(1);
//用分割方法得到 = 号两边内容
var catId = str.split("=");
//用下标找到id的值

//页面导航；分类列表功能
$.get("http://h6.duchengjiu.top/shop/api_cat.php", function (data) {
    var obj = data;
    for (var i = 0; i < obj.data.length; i++) {
        if(obj.data[i].cat_id===catId[1]){
            $("#shop-nav").append('<a class="now-active" href="shop.html?cat_id=' + obj.data[i].cat_id + '"><li>' + obj.data[i].cat_name + '</li></a>');
            continue;
        }
        $("#shop-nav").append('<a href="shop.html?cat_id=' + obj.data[i].cat_id + '"><li>' + obj.data[i].cat_name + '</li></a>');
    }
});

var madd =function(page=1){
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php",
        "type": "GET",
        "data": {
            "cat_id": catId[1],
            "page":page,
            "pagesize":24
        },
        "dataType": "json",
        "success": function (response) {
            //    console.log(response);
            var obj = response.data;
            for (var i = 0; i < obj.length; i++) {
                var data = obj[i];
                var html = `
                        <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <a href="detail.html?cat_id=${data.cat_id}&goods_id=${data.goods_id}"><img src="${data.goods_thumb}" alt="..."></a>
                    <div class="caption">
                        <a href="detail.html?cat_id=${data.cat_id}&goods_id=${data.goods_id}"><h5>${data.goods_name}</h5></a>
                        <h6>${data.goods_desc}</h6>
                        <p><em>价格:￥${data.price} 元</em></p>
                        <p class="btn-container">
                        <a href="./cart.html" class="btn btn-primary" role="button">立即购买</a>
                        <button class="btn btn-primary add-to-cart" role="button" data-goods-id="${data.goods_id}">加入购物车</button>
                        </p>
                    </div>
                </div>
            </div>
                    `;
    
                $("#goodsList").append(html);
            }
            // 绑定添加事件
            bindAddToCart($('.thumbnail .add-to-cart'));
        }
    });
}
madd();
// 分页
$(".mdda").click(function () {
    // console.log(1111);
    // console.log(this.innerHTML);
    $(this).parent().addClass('active').siblings().removeClass('active');
    $('#goodsList').html('');
    madd($(this).html());
});


// $.get("http://h6.duchengjiu.top/shop/api_goods.php?cat_id=" + data.cat_id + "&page=" + page + "&pagesize=24", function (data) {
//     var obj = data;
//     console.log(obj);

//     // for(var i=0;i<obj.data.length;i++){

//     //     $(".pagination page-ul").click
//     //     // http://h6.duchengjiu.top/shop/api_goods.php?cat_id=&page= &pagesize=24

//     // }

// });