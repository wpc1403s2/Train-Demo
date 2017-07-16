/**
 *
 * Created by wpc on 2017/5/11.
 */

window.onload = function () {
    function $(id) {
        return document.getElementById(id)
    }

    var inp = $("inp");
    var watchBtn = $("watchBtn");
    var showInfo = $("showInfo");
    /* 前台事件注册绑定*/
    LD.eventUtil.addHandler(watchBtn, 'click', bridgeHandler);

    /*利用桥模式分开*/
    function bridgeHandler() {
        var grade = inp.value.trim();
        calLevel(grade)
    }

    /*
     * 计算等级
     * @param string grade
     * */
    function calLevel(grade) {
        if (grade == '' || isNaN(grade)) {
            alert('请输入数字');
            inp.value = ''
        } else {
            if (grade > 100 || grade < 0) {
                alert('成绩应该在0~100之间');
                inp.value = '';
            } else if (grade == 100) {
                showInfo.innerHTML = '1';
            } else {
                var levl = grade / 10;
                showInfo.innerHTML = 10 - parseInt(levl);
            }
        }
    }
};