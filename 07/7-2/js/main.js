/**
 * Created by wpc on 2017/5/31.
 */
$(function () {
    /*搜索框*/
    $("#search").click(function () {
        $("#searchbox").animate({
            opacity:1,
            width:1000,
        },500);
        $("#searchbox").css('display', 'flex');
    });
    $("#close-btn").click(function () {
        $("#searchbox").animate({
            opacity:0,
            width:500,
        },500);
        $("#searchbox").css('display', 'none');

    })
    /*侧栏滑动菜单*/
    $(".s-lists").mouseover(function () {
        $(this).addClass('li-hover');
    })
    $(".s-lists").mouseout(function () {
        $(this).removeClass('li-hover');
    })
    /*课程详情*/
    $(".lesson-list-v li").mouseenter(function () {
        if($("#changeLayout").hasClass('lesson-list-v')) {

            $(this).find('.info-txt').stop();
            $(this).find('.info-txt').fadeIn('slow');
            $(this).find('.buttom-info').stop();
            $(this).find('.buttom-info').animate({
                height: 85
            }, 500)
        }
    })
    $(".lesson-list-v li").mouseleave(function () {
        if($("#changeLayout").hasClass('lesson-list-v')) {
            $(this).find('.info-txt').stop();
            $(this).find('.info-txt').fadeOut();
            $(this).find('.buttom-info').stop();
            $(this).find('.buttom-info').animate({
                height: 30
            }, 500)
        }
    })
    /*布局切换*/
    $("#switch_v").click(function () {
        $('#changeLayout').removeClass('lesson-list-l').addClass('lesson-list-v');
        $(".info-txt").hide()

    })
    $("#switch_l").click(function () {
        $('#changeLayout').removeClass('lesson-list-v').addClass('lesson-list-l');
        $(".info-txt").show()
    })


});
