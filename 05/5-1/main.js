/**
 *
 * Created by wpc on 2017/5/11.
 */

window.onload = function () {
    function $(id) {
        return document.getElementById(id)
    }
    /*计算*/
    $("equal").onclick = function () {
        var inpPrev = $("inpPrev").value;
        var inpNext = $("inpNext").value;
        var sel = $("sel");
        var result = $("result");
        //运算符
        var symbol=sel.options[sel.selectedIndex].text;
       if (check(inpPrev)&&check(inpNext)){
           if(symbol=='/'&&inpNext=='0'){
                  alert('分母不能为零');
           }else {
           var arr = [inpPrev, symbol, inpNext];
           var cal = arr.join('');
           console.log(cal);
           result.value = parseFloat(eval(cal)).toFixed(6);
       }
    }
    };
    //检查数字
    function check(str) {
        var str=str.trim();
        if(str==''||isNaN(str)){
            alert('请输入数字');
            return false;
        }else{
            return true;
        }
    }
};