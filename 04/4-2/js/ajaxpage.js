/**
 * Created by wpc on 2017/4/18.
 */
function AjaxPager(options) {
    var defaultOptions={
        renderTO:'',
        page:'',
        params:{},
        pageNumber:'',
        url:'',
        currentPage:1,
        pageSize:15,
        start:0,
        end:15,
        pageCount:1,
        getLocalTime:function (ns) {
            var str=ns.slice(0,10);
            return new Date(parseInt(str) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        },
        callBackMethod:function (data) {
            if(data.length==0){
                var empty_data_info = "<tr><td colspan='3' style='color:red'>查询无数据</td></tr>";
                $("#searchResult").html(empty_data_info);
            }else{
                var tempHtml = "";
                for(var i=0;i<data.menuList.length;i++){
                    var temp=$("<tr></tr>");
                    temp.append(
                        "<td>"+data.menuList[i].menuName+"</td>"+
                        "<td>"+that.defaultOptions.getLocalTime(data.menuList[i].addTime)+"</td>"+
                        "<td>"+data.menuList[i].menuId+"</td>");
                    tempHtml+="<tr>"+temp.html()+"</tr>";
                }
                $("#searchResult").html(tempHtml);
                that.updatePageArea(data.menuNumber);
            }
        }
    }
    this.defaultOptions=defaultOptions;
    //重置配置项
    if(typeof options != "undefined"){
        for(var option in options){
            this.defaultOptions[option] = options[option];
        }
    }
    var that=this;
    getAjaxPagerThis=function () {
        return that;
    }
    this.init();
    this.bindEvent();
}

//初始化page模块函数
AjaxPager.prototype.init = function(){
    //渲染到指定的div中
    if(typeof this.defaultOptions.renderTo != "undefined" && $.trim(this.defaultOptions.renderTo)!=""){
        var $renderDiv = $("#"+$.trim(this.defaultOptions.page));
        $renderDiv.html("");
        $renderDiv.append("<nav aria-label=\"...\">" +
            "<ul class=\"pagination\">" +
            "<li><a href='javascript:void(0)' id='totalCount' style=\" text-decoration:none;\">共0条记录</a></li>" +
            "<li><a href='javascript:void(0)' id='topPage' style=\" text-decoration:none;\">首页</a></li>" +
            "<li><a href='javascript:void(0)' id='prevPage' style=\" text-decoration:none;\">上一页</a></li>" +
            "<li><a href='javascript:void(0)' id='nextPage' style=\" text-decoration:none;\">下一页</a></li>" +
            "<li><a href='javascript:void(0)' id='endPage' style=\" text-decoration:none;\">末页</a></li>" +
            "<li><span style=\"font-size: 14px\"><span id=\"pageSpan\">(0/0)</span></li>" +
            "<li><span>跳转到</span></li>" +
            "<li><input type=\"text\" size=\"2\" id=\"pageIndex\" /></li>" +
            "<li><input id=\"go\" type=\"button\" class='btn btn-default' value=\"GO\"  /></li>"
        );
       /* console.log($renderDiv)*/
    }
}

AjaxPager.prototype.goPage=function (pageIndex) {
    pageIndex=$.trim(pageIndex);
    if(typeof pageIndex=="undefined"||pageIndex==''||pageIndex==null)
        return;
    if(isNaN(pageIndex)||pageIndex<=0){
        alert('输入不合法');
        return;
    }
    if (pageIndex>=this.defaultOptions.pageCount){
        pageIndex=this.defaultOptions.pageCount;
    }
    if (pageIndex<=1){
        pageIndex=1;
    }
    this.defaultOptions.start = (pageIndex - 1) * this.defaultOptions.pageSize;
    this.defaultOptions.end=pageIndex*this.defaultOptions.pageSize;
    this.defaultOptions.currentPage = pageIndex;
    this.loadData(pageIndex-1);
    console.log(pageIndex-1)
}

AjaxPager.prototype.topPage=function () {
    getAjaxPagerThis().defaultOptions.currentPage=1;
    getAjaxPagerThis().goPage(getAjaxPagerThis().defaultOptions.currentPage);
}

AjaxPager.prototype.endPage=function () {
    getAjaxPagerThis().defaultOptions.currentPage = getAjaxPagerThis().defaultOptions.pageCount;
    getAjaxPagerThis().goPage(getAjaxPagerThis().defaultOptions.currentPage);
}
AjaxPager.prototype.prevPage=function () {
    if(getAjaxPagerThis().defaultOptions.currentPage<=1)
        getAjaxPagerThis().defaultOptions.currentPage = 1;
    getAjaxPagerThis().defaultOptions.start = (getAjaxPagerThis().defaultOptions.currentPage-2)*getAjaxPagerThis().defaultOptions.pageSize<0?0:(getAjaxPagerThis().defaultOptions.currentPage-2)*getAjaxPagerThis().defaultOptions.pageSize;
    getAjaxPagerThis().defaultOptions.end = (getAjaxPagerThis().defaultOptions.currentPage-1)*getAjaxPagerThis().defaultOptions.pageSize==0?getAjaxPagerThis().defaultOptions.pageSize:(getAjaxPagerThis().defaultOptions.currentPage-1)*getAjaxPagerThis().defaultOptions.pageSize;
    getAjaxPagerThis().defaultOptions.currentPage==1?1:getAjaxPagerThis().defaultOptions.currentPage--;
    getAjaxPagerThis().goPage(getAjaxPagerThis().defaultOptions.currentPage);
}
AjaxPager.prototype.nextPage = function(){
    if(getAjaxPagerThis().defaultOptions.currentPage>=getAjaxPagerThis().defaultOptions.pageCount)
        getAjaxPagerThis().defaultOptions.currentPage = getAjaxPagerThis().defaultOptions.pageCount-1;
    getAjaxPagerThis().defaultOptions.start = getAjaxPagerThis().defaultOptions.currentPage*getAjaxPagerThis().defaultOptions.pageSize;
    getAjaxPagerThis().defaultOptions.end = (parseInt(getAjaxPagerThis().defaultOptions.currentPage)+parseInt(1))*getAjaxPagerThis().defaultOptions.pageSize;
    getAjaxPagerThis().defaultOptions.currentPage++;
    getAjaxPagerThis().goPage(getAjaxPagerThis().defaultOptions.currentPage);
}
//数字跳转
AjaxPager.prototype.jumpPage = function(){
    var pageIndex = $.trim($("#pageIndex").val());
    getAjaxPagerThis().goPage(pageIndex);
}
//根据外部传入的记录总数和每页显示条目数来计算需要的总页数，并显示在分页区
AjaxPager.prototype.updatePageArea = function(totalCount){
    if(typeof(totalCount)!='undefined' ){
        if(parseInt(totalCount%this.defaultOptions.pageSize)==0){
            this.defaultOptions.pageCount = parseInt(totalCount/this.defaultOptions.pageSize);
        }else{
            this.defaultOptions.pageCount = parseInt(totalCount/this.defaultOptions.pageSize)+1;
        }
        var tempHtml ="";
        if(this.defaultOptions.pageCount==0){
            tempHtml = "("+0+"/"+this.defaultOptions.pageCount+")";
        }else{
            tempHtml = "("+this.defaultOptions.currentPage+"/"+this.defaultOptions.pageCount+")";
        }
        $("#pageSpan").html(tempHtml);
        $("#pageIndex").val(this.defaultOptions.currentPage);
        if(totalCount==0)
            $("#totalCount").html("共0条记录");
        else
            $("#totalCount").html("共"+totalCount+"条记录");
    }
    else{
        alert('记录总数不存在');
        return ;
    }
}
//ajax拉取数据函数
AjaxPager.prototype.loadData = function(pageIndex){
    this.defaultOptions.params.start = this.defaultOptions.start;
    this.defaultOptions.params.end = this.defaultOptions.end;
    $.ajax({
        url:this.defaultOptions.url,
        // data:this.defaultOptions.params,
        data: {
            pageNumber:pageIndex
        },
        type:"POST",
        contentType:"application/x-www-form-urlencoded;charset=utf-8",
        dataType:"json",
        async:false,
        //调用失败
        error:function(e){
            alert("远程请求失败");
        },
        //成功回调函数
        success:function(data){
            getAjaxPagerThis().defaultOptions.callBackMethod(data);
        }
    });

}
AjaxPager.prototype.bindEvent = function(){
    $("#topPage").bind('click',this.topPage);
    $("#prevPage").bind('click',this.prevPage);
    $("#nextPage").bind('click',this.nextPage);
    $("#endPage").bind('click',this.endPage);
    $("#go").bind('click',this.jumpPage);
}







