/**
 * Created by wpc on 2017/6/7.
 */
$(function () {
    var deviceWidth = $('body').width();

    $('#downMenus li').each(function () {
        if ($(this).find('a').html().split('').length > 2) {
            $(this).width(deviceWidth / 3);
        } else {
            $(this).width(deviceWidth / 6);
        }
    });
    //点击导航，显示新闻
    $("#scrollMenus").on('click', 'a', function (e) {
        e.preventDefault();
        $(this).parent().siblings().removeClass('active');
        // console.log($(this).html())
        var currentType = $(this).html();
        console.log(currentType);
        refreshNews(currentType);
    });
    $("#downMenus").on('click', 'a', function (e) {
        e.preventDefault();
        /*console.log($(this).html())*/
        var currentType = $(this).html();
        console.log(currentType);
        refreshNews(currentType);
    });
    //导航样式切换
    $("#switchBtn").click(function () {
        $(".s-info").toggle();
        $("#scrollMenus").toggle();
        $("#downMenus").toggle();
        $(this).find('span').toggleClass('tras')
    })
    var $ulContainer = $("#scrollMenus");
    var width = 0;
    /*console.log($ulContainer.children())*/
    $ulContainer.children().each(function (index, element) {
        width += element.clientWidth;
    })
    $ulContainer.css('width', width + 25);
    refreshNews('推荐');

})
function refreshNews(type) {
    var $lists = $('article ul');
    $lists.empty();

    /*var $list = $('<li></li>').addClass('news-list').appendTo($lists);
     var $newsImg=*/
    $.ajax({
        url: './server/getnews.php',
        type: 'get',
        data: {newsType: type},
        dataType: 'json',
        success: function (data) {
            var template = '';
            data.forEach(function (ietm) {
                template += '<li class="news-list"> ' +
                    '<div class="news-img"> ' +
                    '<img src=' + ietm.newsImg + ' alt=""> ' +
                    '</div> ' +
                    '<div class="news-content"> ' +
                    '<h1>' + ietm.newsTitle + '</h1> ' +
                    '<p>' +
                    '<span class="news-time">' + ietm.newsTime + '</span>' +
                    '<span class="new-src">' + ietm.newsSrc + '</span>' +
                    '</p> ' +
                    '</div> ' +
                    '</li>';

                $lists[0].innerHTML += template;
                template='';
            })
            console.log(template);
        },
        error: function () {
            console.log('ajax error')
        }
    })

}