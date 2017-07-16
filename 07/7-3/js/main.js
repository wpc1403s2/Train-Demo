/**
 * Created by wpc on 2017/6/2.
 */
$(function () {
/*布局*/
    function imgLocation() {
        var imgBox = $(".img-box");
        var imgBoxWidth = imgBox.eq(0).innerWidth();
        var num = Math.floor($('body').width() / imgBoxWidth);
        /*存放高度*/
        var boxHeightArray = [];
        imgBox.each(function (index, value) {
            var boxHeight = imgBox.eq(index).innerHeight();
            if(index<num) { //第一排
                boxHeightArray[index] = boxHeight;
                $(value).css({
                    'position':'absolute',
                    'top':'0px',
                    'left':imgBoxWidth*index
                })
            }else{  //第2，3，4...排
                var minBoxHeight = Math.min.apply(null, boxHeightArray);
                var minBoxIndex = $.inArray(minBoxHeight, boxHeightArray);
                $(value).css({
                    'position': 'absolute',
                    'top':minBoxHeight,
                    'left':imgBox.eq(minBoxIndex)[0].offsetLeft
                });
                boxHeightArray[minBoxIndex]+=imgBox.eq(index).innerHeight()
            }
        });
    }
    imgLocation();
    window.onresize=function () {
        imgLocation()
    }
    var dataImg={
        "data":[
            {'src':"http://cued.xunlei.com/demos/publ/img/P_050.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_015.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_054.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_064.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_078.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_056.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_053.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_044.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_024.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_031.jpg"},
            {'src':"http://cued.xunlei.com/demos/publ/img/P_085.jpg"},

    ]}

    window.onscroll=function () {
        if(scrollside()){
            $.each(dataImg.data,function (index,value) {
                var box = $("<div>").addClass('img-box').appendTo($(".container"));
                var content = $("<div>").addClass('content').appendTo(box);
                $("<img>").attr("src", $(value).attr("src")).appendTo(content);
            })
            imgLocation();
            }
    }
    /*是否加载图片*/
    function scrollside() {
        var imgBox = $(".img-box");
        var lastBoxHeight = imgBox.last()[0].offsetTop + Math.floor(imgBox.last().height()/2);
        var docHeight = $(window).height();
        var scrollHeight = $(window).scrollTop();
        var isLoad=(docHeight+scrollHeight   > lastBoxHeight) ? true : false;

        // console.log(docHeight+scrollHeight-lastBoxHeight)

        return isLoad
    }

})

