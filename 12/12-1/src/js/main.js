/**
 * Created by wpc on 2017/4/8.
 */
$(function () {
    /*导航栏下拉菜单*/
    /**
     * 链式调用
     *
     * 功能：显示二级菜单
     *
     * 优点：优点是代码简洁易读，减少了多次重复使用同一个变量
     *
     * 缺点：不利于调试
     */

    $.fn.toggleMenu=function (menu) {
        var menu = document.getElementById(menu);
        this.hover(
            function () {
                $(menu).show();
            },
            function () {
                $(menu).hide()
            });
        $(menu).hover(
            function () {
                $(menu).show();
            },
            function () {
                $(menu).hide()
            });
        return this;

    };
    $("#user_name").toggleMenu('user_name_menu');
    $("#user_setting").toggleMenu('user_setting_menu');
    $("#more_product").toggleMenu('bd_mainlink');



    /**
     * 桥接模式
     *
     * 功能：搜索提示
     *
     * 优点：能把两个对象连接在一起又能避免二者间的强耦合的方法。
     *      通过“桥”把彼此联系起来同时又允许他们各自独立变化。
     *
     * 缺点：桥接模式的引入会增加系统的理解与设计难度
     *
     *
     */
    $('#inp_search').keyup(function () {
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



    /**
     * js设计模式：单例模式
     *
     * 功能:固定在顶部
     *
     * 优点：在单例模式中，活动的单例只有一个实例，对单例类的所有实例化得到的都是相同的一个实例。
     *      这样就 防止其它对象对自己的实例化，确保所有的对象都访问一个实例
     *
     * 缺点：不适用于变化的对象，如果同一类型的对象总是要在不同的用例场景发生变化，单例就会引起数据的错误，不能保存彼此的状态。
     *      由于单利模式中没有抽象层，因此单例类的扩展有很大的困难。
     *      单例类的职责过重，在一定程度上违背了“单一职责原则”。
     */
var fixedTop={
    init:function () {
        this.render();
        this.bind();
    },
    render:function () {
        var me=this;
        me.headSearch=$("#head_wrapper");
        me.headSearchTop = me.headSearch[0].offsetTop + 120;

    },
    bind:function () {
        var me=this;
        $(window).scroll(function () {
            if ($("body").scrollTop() >= me.headSearchTop) {
                me.headSearch.addClass('s-down');
                $("#s_top_wrap").addClass('s-down');
                $(".s-top-nav").css('display', 'block');
            } else {
                me.headSearch.removeClass('s-down');
                $("#s_top_wrap").removeClass('s-down');
                $(".s-top-nav").css('display', 'none');
            }
        })
    }
};





//    换肤器
    var changeSkin={
        init:function () {
            $(".fadeToggleBox").click(function () {
                $(".skin-wrapper").toggle('normal');
            });
            this.render();
            this.bind();
        },
        render:function () {
            var me = this;
            me.skin=$("#skinPic").find('td');
            me.cancelSkin=$("#cancelSkin");
        },
        bind:function () {
            var me=this;
            if(localStorage.getItem('background')){
                setStyles()
            }
            function setStyles() {
                var imgUrl = localStorage.getItem('background');
                var currentBg = imgUrl.split('_plus').join('');
                $(".body-bg").css({
                    'background': 'url(' + currentBg + ')',
                    'background-attachment': 'fixed',
                    'background-repeat': 'no-repeat'
                });
                var logo = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png';
                $("#s_logo").attr('src', logo);
                $(".top-nav").css('background', 'hsla(0, 0%, 29%, 0.44)');
                $(".top-nav a").css('color', '#ffffff');
                $(".submit-btn").css({
                    'color': '#333',
                    'background': '#ddd'
                });
            }
            me.skin.click(function (e) {
                var e = event.target;
                localStorage.setItem('background', $(e).attr('src'));
                localStorage.setItem('logo', 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png');
                setStyles();
            });
            me.cancelSkin.click(function () {
                localStorage.removeItem('background');
                $(".body-bg").css('background', '#fff');
                var logo='https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
                $("#s_logo").attr('src', logo);
                $(".top-nav").css('background', '#fff');
                $(".top-nav a").css('color', '#333');
                $(".submit-btn").css({
                    'color': '#fff',
                    'background': '#3388ff'
                });
            })

        }
        
    };

    var start=(function () {
        fixedTop.init();
        changeSkin.init();
    })();

});