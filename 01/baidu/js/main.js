/**
 * Created by wpc on 2017/4/8.
 */
$(function () {
    $('.user-name').hover(
        function () {
            $('.user-name-menu').show();
    },
       function () {
           $('.user-name-menu').hide()
       });
    $('.user-name-menu').hover(
        function () {
            $('.user-name-menu').show();
        },
        function () {
            $('.user-name-menu').hide();
        }
    );
    $('.user-setting').hover(
        function () {
            $('.user-setting-menu').show();
        },
        function () {
            $('.user-setting-menu').hide()
        }
    );
    $('.user-setting-menu').hover(
        function () {
            $('.user-setting-menu').show();
        },
        function () {
            $('.user-setting-menu').hide()
        }
    );
    $('.more-pro').hover(function () {
        $('.bd-mainlink').fadeIn();
    });
    $('.bd-mainlink').mouseleave(function () {
        $('.bd-mainlink').fadeOut();
    })
    $('#inp-search').keyup(function (e) {
        var kw=$('#inp-search').val();
        var url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+kw;
        querySUG(url)
    });

    function querySUG(url) {
        $('#remList').html('');
        $.ajax({
            type:'get',
            url:url,
            dataType:'jsonp',
            jsonp:'cb',
            jsonpCallback:'callback',
            success:function (responseText,status,xhr) {
                var data=responseText.s;
                var tag='<ul>';
                $.each(data,function (index,value) {
                    tag+='<li>'+value+'</li>';
                });
                tag+='</ul>';
                $('#remList').html(tag).show();
                $('#remList').find('li').hover(function () {
                    $(this).css({
                        background:"#38f",
                        color:"#fff"
                    });
                    $('#inp-search').val($(this).html());
                        $('#inp-search').css('border','1px solid #3388ff')
                },
                function () {
                    $(this).css({
                        background:"#fff",
                        color:"#000"
                    })
                })

            },
            error:function () {
                console.log('fail');
            }
        })
    }



});