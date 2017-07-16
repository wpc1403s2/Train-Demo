/**
 * Created by wpc on 2017/4/8.
 */
$(function () {
    /*导航栏下拉菜单*/
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
    });
    /*搜索提示*/
    $('#inp_search').keyup(function (e) {
        var kw = $('#inp_search').val();
        var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + kw;
        querySUG(url)
    });

    function querySUG(url) {
        $('#remList').html('');
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'jsonp',
            jsonp: 'cb',
            jsonpCallback: 'callback',
            success: function (responseText, status, xhr) {
                var data = responseText.s;
                var tag = '<ul>';
                $.each(data, function (index, value) {
                    tag += '<li>' + value + '</li>';
                });
                tag += '</ul>';
                $('#remList').html(tag).show();
                $('#remList').find('li').hover(function () {
                        $(this).css({
                            background: "#38f",
                            color: "#fff"
                        });
                        $('#inp_search').val($(this).html());
                        $('#inp_search').css('border', '1px solid #3388ff')
                    },
                    function () {
                        $(this).css({
                            background: "#fff",
                            color: "#000"
                        })
                    })

            },
            error: function () {
                console.log('fail');
            }
        })
    }

    /*tab切换*/
    $("#my_attention").tab('show');
//    固定在顶部
    var headSearch = $("#head_wrapper")[0];
    var headSearchTop = headSearch.offsetTop + 120;
    var rg;
    $(window).resize(function () {
        rg = $(window).width() - $(".s-news-list-wrapper").offset().left - $(".s-news-list-wrapper").outerWidth() - $(".s-news-rank-wrapper").innerWidth() - 24;
        localStorage.setItem('right', rg);
        if ($("body").scrollTop() >= 260) {
            $(".s-news-rank-wrapper").css('right', rg);
        }
    });

    $(window).scroll(function () {
        if ($("body").scrollTop() >= headSearchTop) {
            headSearch.className = 's-down';
            $("#s_top_wrap").addClass('s-down');
            $(".s-top-nav").css('display', 'block');
            if ($("body").scrollTop() >= 260) {
                // console.log($("body").scrollTop())
                $("#hot").addClass('hot-fixed');
                $(".s-news-rank-wrapper").css('right', rg);
                if(localStorage.getItem('right')==null){
                     $(".hot-fixed").css('right',200);
                }else{
                     $(".hot-fixed").css('right', localStorage.getItem('right')+'px');
                }
               
                console.log(localStorage.getItem('right'));
            } else {
                $("#hot").removeClass('hot-fixed');
                $(".s-news-rank-wrapper").removeAttr('style');
            }
        } else {
            headSearch.className = '';
            $("#s_top_wrap").removeClass('s-down');
            $(".s-top-nav").css('display', 'none');
        }
    })
//    换肤

    $(".fadeToggleBox").click(function () {
        $(".skin-wrapper").toggle('normal');
    })

    if (!localStorage.getItem('logo')) {

        populateStorage();
    } else {
        setStyles()
    }
    /*if (!localStorage.getItem('logo')) {
         setStyles()
    }*/
    function populateStorage(e) {

        console.log(e)
        if(localStorage.getItem('logo')){
            localStorage.setItem('background', $(e).attr('src'));
            // localStorage.setItem('logo', 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png');
            localStorage.setItem('navStyle', 'hsla(0, 0%, 29%, 0.44)');
            localStorage.setItem('aLinkStyle', '#ffffff');
            localStorage.setItem('btnColor', '#333');
            localStorage.setItem('btnBackground', '#ddd');
        }

    }

    function setStyles() {
        var imgUrl = localStorage.getItem('background');
        var currentBg = imgUrl.split('_plus').join('');
        $(".body-bg").css({
            'background': 'url(' + currentBg + ')',
            'background-attachment': 'fixed',
            'background-repeat': 'no-repeat'

        });
        var logo = localStorage.getItem('logo');
        var navStyle = localStorage.getItem('navStyle');
        var aLinkStyle = localStorage.getItem('aLinkStyle');
        var btnColor = localStorage.getItem('btnColor');
        var btnBackground = localStorage.getItem('btnBackground');
        $("#s_logo").attr('src', logo);
        $(".top-nav").css('background', navStyle);
        $(".top-nav a").css('color', aLinkStyle);
        $(".submit-btn").css({
            'color': btnColor,
            'background': btnBackground
        });
    }

    $("#skinPic").find('td').click(function () {
        var e = event.target;
        localStorage.setItem('logo', 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png');        
        populateStorage(e)
        setStyles();
        
    })
    /*不使用换肤*/
    $("#cancelSkin").click(function () {
       
        localStorage.setItem('background', '#fff');
        localStorage.setItem('logo', 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png');
        localStorage.setItem('navStyle', '#fff');
        localStorage.setItem('aLinkStyle', '#000');
        localStorage.setItem('btnColor', '#fff');
        localStorage.setItem('btnBackground', '#38f');

    })

});