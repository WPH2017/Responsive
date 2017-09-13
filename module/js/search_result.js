(function ($) {
    var str=location.search;
    //TODO:str不能重复定义
    // str=decodeURIComponent(str.match(/wrd=\S+/)[1]);
    // console.log(str)
    //TODO:match函数的使用方法
    var text=decodeURIComponent(str.match(/wrd=(\S+)/)[1]);

    $.ajax({
        url:'http://h6.duchengjiu.top/shop/api_goods.php',
        type:'GET',
        data:{
            'search_text':text
        },
        success:function (response) {
            if(response.code===0){
                var resultSection=$('section.result .row');
                var className=JSON.parse(localStorage.getItem('classList'));
                var dataArr=response.data;
                var html='';

                //数据导入
                //用一个变量保存搜索结果里有的类别，用于筛选
                var tempArr={};
                for(var i=0;i<dataArr.length;i++){
                    var json=dataArr[i];
                    html=`
                        <div class="col-lg-3 result-box">
                            <a href="detail.html?cat_id=${json.cat_id}&goods_id=${json.goods_id}"><img src="${json.goods_thumb}" alt=""></a>
                            <p><nobr>${json.goods_name}</nobr></p>
                            <a href="./shop.html?cat_id=${json.cat_id}" class="filt-val">${className[json.cat_id]}</a>
                        </div>
                    `;
                    if(tempArr[json.cat_id]){
                        tempArr[json.cat_id]++;
                    }else{
                        tempArr[json.cat_id]=1;
                    }
                    resultSection.append(html);
                }

                html='';
                //筛选功能
                for(var key in className){
                    if(tempArr[key]){
                        html+=`<button class="filtrate">${className[key]}</button>${tempArr[key]} 件`;
                    }
                }
                $('section.result .container h1').html(`
                    <p>为你搜到与 "${text}" 相关的良品 ${response.page.count} 件</p>
                    <p>*开发：此处由于API限制，只能返回10个商品，筛选功能本身是完善的。API修复后将可以正常工作，请多见谅~~~*</p>
                    <p><button class="all">全选</button>  筛选 ${html}</p>
                `);
                $('section.result .container h1 .all').click(function () {
                    $('.result-box').each(function () {
                        $(this).show();
                    });
                });

            //    绑定筛选功能
                $('section.result .container h1 .filtrate').click(function () {
                    var innerText=$(this).html();
                    $('.result-box').each(function () {
                        $(this).show();
                        if($('.filt-val',$(this)).html()!=innerText){
                            $(this).hide();
                        }
                    });
                });
            }else{
                $('section.result').html('对不起，没有搜索到"'+text+'"相关的商品~').css({
                    textAlign:'center',
                    fontSize:30,
                    color:'#ccc'
                });
            }
        }


    })
})(jQuery);