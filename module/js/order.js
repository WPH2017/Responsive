// $(function() {
//     var token = getToken();
//     if (!token) return;
//     var html = "";
//     $.ajax({
//         "url": "http://h6.duchengjiu.top/shop/api_useraddress.php",
//         "type": "GET",
//         "data": {
//             "token": token
//         },
//         "success": function (response) {
//             var html = "";
//             var data = response.data;
//             for (var i = 0; i < data.length; i++) {
//                 var json = data[i];
//                 if (i == 0) {
//                     html += `
//                         <ul class="every-had" data-id="${json.address_id}">
//                                 <li>收货人姓名：${json.address_name}</li>
//                                 <li>收货地址：${json.province} ${json.city} ${json.address}</li>
//                                 <li>手机：${json.mobile}</li>                           
//                         </ul>
//                     `;

//                 }
//             }
//             $('.address').append(html);


//         }

//     })

// // 查看订单列表

// });

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
});
    
