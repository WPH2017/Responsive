//触发商品列表下滑
$(".product-menu-title").click();

//导入各类数据
function importData(obj,flag,cat_id,size,className='',callback,callbackArgs) {
    //传入被导入的对象，flag表示是否有小标签，cat_id是类别，size表示导入数据的数量
    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_goods.php',
        type:'GET',
        data:{
            cat_id:cat_id
        },
        success:function (response) {
            if(response.code===0){
                var html='';
                var dataArr=response.data;
                var singleHtml;
                for(var i=0;i<size;i++){
                    var data=dataArr[i];
                    if(!flag){
                        singleHtml=`
                            <div class="single-goods ${className}">
                                <div class="img-box">
                                    <img src="${data.goods_thumb}" alt="">
                                </div>
                                <div class="single-content">
                                    <a href="#">
                                        <h5>${data.goods_name}</h5></a>
                                    <a href="">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </a>
                                    <p>￥ ${data.price}</p>
                                    <div class="add-cart">
                                        <button class="add-to-cart" data-goods-id="${data.goods_id}">
                                            <i class="fa fa-shopping-cart"></i> 添加到购物车
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else{
                        singleHtml=`
                            <div class="single-goods ${className}">
                                <div class="img-box">
                                    <img src="${data.goods_thumb}" alt="">
                                </div>
                                <div class="single-content">
                                    <a href="#">
                                        <h5>${data.goods_name}</h5></a>
                                    <a href="">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </a>
                                    <p>￥ ${data.price}</p>
                                    <div class="add-cart">
                                        <button class="add-to-cart" data-goods-id="${data.goods_id}">
                                            <i class="fa fa-shopping-cart"></i> 添加到购物车
                                        </button>
                                        <div class="goods-icon">
                                            <i class="fa fa-exchange"></i>
                                            <i class="fa fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    html+=singleHtml;
                }
                obj.append(html);
                // obj.html('').append(html);
            }

        //    如果有回调及参数，则执行回调
            if(callback&&callbackArgs)callback(callbackArgs);
        }
    });
}

importData($('.goods-list .best-seller .goods-box'),false,55,5);

importData($('.goods-list .spe-seller .goods-box'),false,69,1);

importData($('.goods-list .client-seller .goods-box'),false,62,1);

importData($('.goods-list .super-seller .goods-box'),true,77,4,'col-lg-3 col-sm-6 col-xs-12');

importData($('.goods-list .new-seller .goods-box'),true,82,8,'col-lg-3 col-sm-6 col-xs-12',bindAddToCart,$('button.add-to-cart'));




//轮播图

