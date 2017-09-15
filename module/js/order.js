
$(function() {
    //地址id号
    var address_id = 0;
    addressAjax();

    function addressAjax() {
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token,
            "type": "GET",
            "dataType": "json",
            "success": function (response) {
                console.log(response);

                var htmlData = '';
                for (var i = 0; i < response.data.length; i++) {
                    var obj = response.data[i];

                    htmlData += '<li class="address-item" data-id="' + obj.address_id + '">收货人：'
                        + obj.address_name
                        + '  省份：' + obj.province
                        + '  市：' + obj.city
                        + '  街道：' + obj.address
                        + '  手机号：' + obj.mobile
                       ;

                }
                $(".addess-ul").html(htmlData);
            }
        })
    }

    var token =getToken();
    if(!token) return ;
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
                                   
                                    <img src="${data.goods_thumb}" alt="">
                                </td>
                                <td><a href="">${data.goods_name}</a>
                                </td>
                                <td>
                                    <button class="numless"> </button>
                                    <span class="goodsnum">${data.goods_number}</span>
                                    <button class="nummore"></button>
                                </td>
                                <td class="goodsprice">
                                    ${data.goods_price}
                                </td>
                                <td class="goodsamount">
                                     ${data.goods_price*data.goods_number}
                                 </td>
            
                            </tr>`;
    
                        $('.cart-table').html($('.cart-table').html()+html);
                    }
}}
})
});


