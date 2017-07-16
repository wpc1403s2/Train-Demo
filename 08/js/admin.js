/**
 * Created by wpc on 2017/6/8.
 */
$(function () {
    var newsLists = $("#newsTable tbody");
    refreshNews();

    //添加新闻
    $("#btnSubmit").click(function (e) {
        e.preventDefault();

        //    验证输入
        var isNull = $("#exampleInputTitle").val() === '' || $("#exampleInputSrc").val() === '' || $("#exampleInputType").val() === '' || $("#exampleInputImg").val() === '' || $("#exampleInputDate").val() === '';
        if (isNull) {
            if ($("#exampleInputTitle").val() === '') {
                $("#exampleInputTitle").parent().addClass('has-error');
            } else {
                $("#exampleInputTitle").parent().removeClass('has-error');
            }
            if ($("#exampleInputType").val() === '') {
                $("#exampleInputType").parent().addClass('has-error');
            } else {
                $("#exampleInputType").parent().removeClass('has-error');
            }
            if ($("#exampleInputImg").val() === '') {
                $("#exampleInputImg").parent().addClass('has-error');
            } else {
                $("#exampleInputImg").parent().removeClass('has-error');
            }
            if ($("#exampleInputSrc").val() === '') {
                $("#exampleInputSrc").parent().addClass('has-error');
            } else {
                $("#exampleInputSrc").parent().removeClass('has-error');
            }
            if ($("#exampleInputDate").val() === '') {
                $("#exampleInputDate").parent().addClass('has-error');
            } else {
                $("#exampleInputDate").parent().removeClass('has-error');
            }
        } else {

            var jsonNews = {
                newsTitle: $("#exampleInputTitle").val(),
                newsType: $("#exampleInputType").val(),
                newsImg: $("#exampleInputImg").val(),
                newsSrc: $("#exampleInputSrc").val(),
                newsTime: $("#exampleInputDate").val(),
            }

            //    提交添加
            $.ajax({
                url: './server/insert.php',
                type: 'post',
                data: jsonNews,
                dateType: 'json',
                success: function (data) {
                    // console.log('success')
                    refreshNews()
                }
            })
            //重置
            $(this).parent().find('input').val('');
            $('#exampleInputType')[0].selectedIndex=0;
        }

    });
    //删除
    var deleteId = null;
    newsLists.on('click', '.btn-danger', function () {
        deleteId = $(this).parent().prevAll().eq(4).html()
    });
    $("#delete-btn").click(function () {
        if (deleteId) {
            $.ajax({
                url: './server/del.php',
                type: 'post',
                data: {newsId: deleteId},
                success: function (data) {
                    console.log('删除成功');
                    $("#deleteModal").modal('hide');
                    refreshNews()
                }
            })
        }
    })

    //修改
    var updateId = null;
    newsLists.on('click', '.btn-primary', function () {
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: './server/curnews.php',
            type: 'get',
            dataType: 'json',
            data: {newsId: updateId},
            success: function (data) {
                console.log(data);
                data.forEach(function (item) {
                    var str = '';
                    str += '<div class="form-wrap"> ' +
                        '<form action="server/curnews.php"  method="post"> ' +
                        '<div class="form-group"> ' +
                        '<label for="updateInputType">新闻类型</label> ' +
                        '<select name="newsType" id="updateInputType"  class="form-control" > ' +
                        '<option value="推荐">推荐</option> ' +
                        '<option value="百家">百家</option> ' +
                        '<option value="本地">本地</option> ' +
                        '<option value="娱乐">娱乐</option> ' +
                        '<option value="社会">社会</option> ' +
                        '<option value="军事">军事</option> ' +
                        '<option value="女人">女人</option> ' +
                        '<option value="搞笑">搞笑</option> ' +
                        '<option value="互联网">互联网</option> ' +
                        '<option value="科技">科技</option> ' +
                        '<option value="生活">生活</option> ' +
                        '<option value="国际">国际</option> ' +
                        '<option value="国内">国内</option> ' +
                        '<option value="体育">体育</option> ' +
                        '<option value="汽车">汽车</option> ' +
                        '<option value="财经">财经</option> ' +
                        '<option value="房产">房产</option> ' +
                        '<option value="时尚">时尚</option> ' +
                        '<option value="教育">教育</option> ' +
                        '<option value="游戏">游戏</option> ' +
                        '<option value="旅游">旅游</option> ' +
                        '<option value="人文">人文</option> ' +
                        '<option value="创意">创意</option> ' +
                        '</select>' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label for="updateInputTitle">新闻标题</label> ' +
                        '<input type="text" class="form-control" id="updateInputTitle" name="title" value=' + item.newsTitle + '> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label for="updateInputImg">图片地址</label> ' +
                        '<input type="text" class="form-control" id="updateInputImg" name="img" value=' + item.newsImg + '> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label for="updateInputSrc">新闻来源</label> ' +
                        '<input type="text" class="form-control" id="updateInputSrc" name="newsSrc" value=' + item.newsSrc + '> ' +
                        '</div> ' +
                        '<div class="form-group"> ' +
                        '<label for="updateInputDate">添加时间</label> ' +
                        '<input type="date" class="form-control" id="updateInputDate" name="time" value=' + item.newsTime + '> ' +
                        '</div> ' +
                        '</form> ' +
                        '</div>'
                    $("#updateModalBody").html(str);
                    $("#updateInputType").val(item.newsType);
                })

                refreshNews()
            }
        })
    });
    $("#confirmUpdate").click(function () {
        console.log($("#updateInputType").val())
        $("#updateModal").modal('hide');
        if (updateId) {
            $.ajax({
                url: './server/update.php',
                type: 'post',
                data: {
                    newsId: updateId,
                    newsType: $("#updateInputType").val(),
                    newsTitle: $("#updateInputTitle").val(),
                    newsSrc: $("#updateInputSrc").val(),
                    newsImg: $("#updateInputImg").val(),
                    newsTime: $("#updateInputDate").val(),

                },
                success: function (data) {
                    console.log('修改成功');
                    $("#updateModal").modal('hide');
                    refreshNews()
                }
            })
        }
    })

    function refreshNews(type) {
        var type = type ? type : '';
        newsLists.empty();
        $.ajax({
            url: './server/getnews.php',
            type: 'get',
            dateType: 'json',
            data: {newsType: type},
            success: function (data) {
                data.forEach(function (item) {
                    // console.log(item);
                    var str = '';
                    str += '<tr> ' +
                        '<td>' + item.id + '</td> ' +
                        '<td>' + item.newsType + '</td> ' +
                        '<td>' + item.newsTitle + '</td> ' +
                        '<td>' + item.newsImg + '</td> ' +
                        '<td>' + item.newsTime + '</td> ' +
                        '<td> ' +
                        '<button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#updateModal">修改</button> ' +
                        '<button class="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteModal">删除</button> ' +
                        '</td> ' +
                        '</tr>';
                    /*console.log(str);*/
                    $("#newsTable tbody")[0].innerHTML += str;
                })
            },
            error: function () {
                console.log('ajax error')
            }
        })
    }
})

