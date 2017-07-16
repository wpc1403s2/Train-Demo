/**
 * Created by wpc on 2017/5/11.
 */
var LD = {};
/*
* 单体模式
* 实现跨浏览器事件绑定
* */
LD.eventUtil={
    addHandler:function (element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false) //false 冒泡
        }else if(element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener) {
            element.removeEventListener(type,handler,false) //false 冒泡
        }else if(element.detachEvent) {
            element.detachEvent('on' + type, handler);
        }
    }
}