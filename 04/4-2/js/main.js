/**
 * Created by wpc on 2017/4/12.
 */
$(function () {
    /*注册*/
    $('#register').validate({
        /*验证成功后执行*/
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: 'http://java.tustcs.com/News/api/user/register',
                type: "post",
                success: function (data) {
                    $.cookie('user', $("#user").val());
                    // console.log(data);
                    // var json = $.parseJSON(data);
                    var json = JSON.parse(data);
                    console.log(json);
                    $("#reg_result").find('.modal-content').html(json.msg);
                    $("#reg_result").modal('toggle');
                    if (json.status == 1) {
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 2000)
                    }
                },
                error: function (status) {

                }
            })
        },
        rules: {
            userName: {
                required: true,
                minlength: 2,
            },
            userPwd: {
                required: true,
                minlength: 6,
            },
            rePwd: {
                required: true,
                equalTo: "#Pwd",
            },
            email: {
                email: true,
            },
        },
        messages: {
            userName: {
                required: '账号不得为空',
                minlength: $.format('账号不得小于{0}位'),

            },
            userPwd: {
                required: '密码不得为空',
                rangelength: $.format('密码不得小于{0}位'),
            },
            rePwd: {
                required: '密码必须一致',
            }
        }
    });
    /*登录*/
    $("#login").validate({
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: 'http://java.tustcs.com/News/api/user/login',
                type: 'POST',
                success: function (data) {
                    var json = $.parseJSON(data);

                    if (json.status == 1) {
                        localStorage.userName = $('#user_name').val();
                        $.cookie('user', $('#user_name').val(), {
                            expires: 7,
                        });
                        window.location.href = 'user/admin.html';

                    } else if (json.status == 0) {
                        alert(json.msg)
                    }
                },
                error: function () {
                    alert('error')
                }
            })
        },
        rules: {
            userName: {
                required: true,
                minlength: 2,
            },
            userPwd: {
                required: true,
                minlength: 6,
            },
        },
        messages: {
            userName: {
                required: "账号不得为空",
                minlength: $.format('账号不得少于{0}位')
            },
            userPwd: {
                required: "密码不得为空",
                minlength: $.format('密码不得小于{0}位'),
                remote: '账号或密码不正确'
            }


        }
    })
    /*管理页面*/

    if ($.cookie('user')) {
        $("#admin_name").html($.cookie('user'));
    } else {
        $("#admin_name").html(localStorage.userName)
    }
    /*菜单切换*/
    $("#btn_list li").click(function () {
        var $this = $(this);
        index = $this.index();
        // $this.addClass('btn-color-active').siblings('button').removeClass('btn-color-active');
        $("#tab_list>div").eq(index).addClass('selected').siblings('div').removeClass('selected')

    })
    /*绑定模态框*/
    function bindModal(e) {
        $("#myModal").modal('show');
        var del = [];
        del = e.parent().parent().find('td');
        // $("#myModal").find('.modal-body').html(del.length);
        var str = '';
        $.each($(".del-item"), function (index1, value) {
            str = $(del[index1]).html();
            $(this).find('input').val(str)
        });
    }

    /*添加*/
    $("#add_article_form").submit(function () {
            $(this).ajaxSubmit({
                url: 'http://java.tustcs.com/News/api/menu/addMenu',
                type: "POST",
                success: function (data) {
                    var json = $.parseJSON(data);
                    if (json.status == 0) {
                        $("#add_article_form").resetForm();
                        alert('文章名称已存在')
                    }
                    if (json.status == 1) {
                        var date = new Date();
                        var str = '';
                        str += '<tr class="info-list">' +
                            '<td>' + $("input[name='menuName']").val() + '</td>' +
                            '<td>' + $("input[name='sort']").val() + '</td>' +
                            '<td>' + $("input[name='remark']").val() + '</td>' +
                            '<td>' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '</td>' +
                            '<td>' +
                            '<button type="button" class="btn btn-default btn-sm re-info">修改</button>' +
                            '<button type="button" class="btn btn-default btn-sm del-info">删除</button>' +
                            '</td>' +
                            '</tr>'
                        $("#add_tr_info").append(str);
                        $("#add_article_form").resetForm();
                        $("#addArticleModal").modal('hide');
                        $.each($(".info-list"), function (index, value) {
                            /*绑定删除事件*/
                            $(this).on('click', '.del-info', function () {
                                var $this = $(this);
                                bindModal($this);
                                /*删除*/
                                $(".modal-form").ajaxForm({
                                    url: 'http://java.tustcs.com/News/api/menu/delete',
                                    type: 'POST',
                                    data: {
                                        menuId: 1,
                                    },
                                    success: function (data) {
                                        var json = $.parseJSON(data);
                                        if (json.status == 1) {
                                            $("#add_tr_info tr").eq(index).detach();
                                            $(".modal-form").resetForm();
                                            $("#myModal").modal('hide');
                                        } else if (json.status == 0) {
                                            alert('删除失败');
                                        }
                                    }
                                });
                            });
                            /*绑定修改事件*/
                            $(this).on('click', '.re-info', function () {
                                var $this = $(this);
                                bindModal($this);
                                $(".modal-form").ajaxForm({
                                    url: 'http://java.tustcs.com/News/api/menu/changeMenu',
                                    type: 'POST',
                                    data: {
                                        menuId: 2,
                                        menuName: $(".mod-title").val()
                                    },
                                    success: function (data) {
                                        var json = $.parseJSON(data);
                                        if (json.status == 1) {
                                            var date = new Date();
                                            $("#add_tr_info tr").eq(index).html(
                                                '<td>' + $(".mod-title").val() + '</td>' +
                                                '<td>' + $(".mod-sort").val() + '</td>' +
                                                '<td>' + $(".mod-remark").val() + '</td>' +
                                                '<td>' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '</td>' +
                                                '<td>' +
                                                '<button type="button" class="btn btn-default btn-sm re-info">修改</button>' +
                                                '<button type="button" class="btn btn-default btn-sm del-info">删除</button>' +
                                                '</td>'
                                            );
                                            $(".modal-form").resetForm();
                                            $("#myModal").modal('hide');
                                        } else if (json.status == 0) {
                                            alert('修改失败')
                                        }
                                    }
                                })
                            })
                        })
                    }
                },
                error: function () {
                    alert('添加失败')
                }

            })
            return false;
        }
    );
    /*分页*/
    var pager;
    var pageIndex = 0;
    $("#searchBtn").click(function () {
        pager = new AjaxPager({
            renderTo: 'searchResult',
            page: 'page',
            url: 'http://java.tustcs.com/News/api/menu/queryMenuList',
            params: {
                'pageNumber': $("#pageIndex").val(),
            },
            /*callBackMethod:buildInfo*/
        });
        pager.topPage();
    });
    /*滑动菜单*/
    $("#showLeftPush").click(function () {
        if ($(window).width() > 769) {
            var $this = $(this);
            $this.toggleClass('btn-active');
            $('body').toggleClass('cbp-spmenu-push-toright');
            $("#cbp-spmenu-s1").toggleClass('cbp-spmenu-open');
        } else {
            var $this = $(this);
            $this.toggleClass('btn-active');
            $('body').toggleClass('cbp-spmenu-push-toright');
            $("#cbp-spmenu-s1").show().toggleClass('cbp-spmenu-open');
        }
    })
});













