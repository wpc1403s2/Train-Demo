/**
 * Created by wpc on 2017/5/3.
 */
function animate(obj,target) {
    clearInterval(obj.timer);
    var speed=obj.offsetLeft<target?15:-15;
    obj.timer = setInterval(function () {
        var result = target - obj.offsetLeft;//差值不会小于一步
        if(Math.abs(result)){
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
        }

    },10);
}
function scroll() {
    if(window.pageYOffset!==null) {//IE9和其他浏览器
        return {
            left:window.pageXOffset,
            top:window.pageYOffset,
        }
    }
    //CSS1Compat：标准兼容模式开启。浏览器客户区宽度是document.documentElement.clientWidth。
    else if(document.compatMode=="CSS1Compat") {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }

    }
    return{
        //剩下的肯定是怪异模式的
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }

}