(function ($) {
    var token=getToken();

    if(!token) return;

    //拉取数据并绑定相关事件
    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_cart.php',
        type:'GET',
        data:{
            token:token
        },
        success:function (response) {
            if(response.code===0){
                for(var i=0;i<response.data.length;i++){
                    var data=response.data[i];
                    var html=`<tr class="item" data-id="${data.goods_id}">
                            <td>
                                <input type="checkbox">
                                <img src="${data.goods_thumb}" alt="">
                            </td>
                            <td><a href="">${data.goods_name}</a>
                            </td>
                            <td>
                                <button class="numless">- </button>
                                <span class="goodsnum">${data.goods_number}</span>
                                <button class="nummore"> +</button>
                            </td>
                            <td class="goodsprice">
                                ${data.goods_price}
                            </td>
                            <td class="goodsamount">
                                ${data.goods_price*data.goods_number}
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="cart-delete">删除</a>
                            </td>
                        </tr>`;

                    $('.cart-table').html($('.cart-table').html()+html);
                }

                updateSum();
                //绑定全选按钮事件
                $('.cart-table th input:checkbox').click(function () {
                    var chk=$('.cart-table th input:checkbox').prop("checked");
                    // $('.cart-table th input:checkbox').prop("checked",chk);
                    $('.cart-table .item input').each(function () {
                        $(this).prop("checked",chk);
                    });
                    updateSum();
                });

                //绑定单个商品按钮事件
                $('.cart-table .item input').click(function () {
                    updateSum();
                });

                //绑定商品数量增减事件
                $('.numless').each(function (index) {
                    $(this).click(function () {
                        var oNum=$('.goodsnum').eq(index);
                        var temp=1*oNum.html()-1;
                        if(temp<0){
                            temp=0;
                        }
                        if(temp>10){
                            temp=10;
                        }
                        oNum.html(temp);
                        $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
                    });
                });
                $('.nummore').each(function (index) {
                    $(this).click(function () {
                        var oNum=$('.goodsnum').eq(index);
                        var temp=1*oNum.html()+1;
                        if(temp<0){
                            temp=0;
                        }
                        if(temp>10){
                            temp=10;
                        }
                        oNum.html(temp);
                        $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
                    })
                });
            }else if(response.code===1){
                if(confirm('您还未选择商品，要帮您跳转到商品页吗?')){
                    location.href='./shop.html';
                }
            }
            //计算总价
            //用到了自定义绑定事件，每当小计改变就给总价赋值
            $('.goodsamount').bind('DOMNodeInserted',function () {
                updateSum();
            });

            //封装改变总价函数
            function updateSum() {
                var sum=$('.number','.summary');
                var temp=0;
                $('.goodsamount').each(function () {
                    if($(this).parent().find('input:checkbox').is(':checked')){
                        temp+=1*$(this).html();
                    }
                });
                sum.html("￥"+temp);
            }

            //删除当前商品
            $('.cart-delete').each(function(){
                $(this).click(function () {
                    if(!confirm("确定要删除当前商品吗？")) return;
                    var aim=$(this);
                    console.log($(this).parent().parent().attr("data-id"));
                    $.ajax({
                        "type":"POST",
                        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
                        "data":{
                            // "token":localStorage.getItem("token"),
                            "goods_id":$(this).parent().parent().attr("data-id"),
                            "number":0,
                            // "user_id":localStorage.getItem("user_id")
                        },
                        "success":function (response) {
                            aim.parent().parent().remove();
                            location.reload();
                        }
                    });
                })
            })
        }
    });

    $('button.submit').click(function () {
        var token=getToken();

        if(!token) return;

        //调整购物车
        $('.goodsamount').each(function () {
            //没选中的商品
            if(!$(this).parent().find('input:checkbox').is(':checked')){
                $.ajax({
                    "type":"POST",
                    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
                    "data":{
                        "goods_id":$(this).parent().attr("data-id"),
                        "number":0
                    },
                    "success":function (response) {
                        console.log("删除一个商品");
                        // location.reload();
                    }
                });
            }
        });

        //2. 本地存储总价
        localStorage.setItem("summary",$('.number','.summary').html());
        //跳转
        location.href="settle.html#callback="+location.href;
    });
})(jQuery);