/**
 * Created by wpc on 2017/5/12.
 */
window.onload = function () {
    var inquire = document.getElementById('inquire');
    inquire.onclick = function () {
        var inpValue = document.getElementById('inp').value;
        document.getElementById('maxValue').innerHTML = '';
        document.getElementById('count').innerHTML = '';
        document.getElementById('pos').innerHTML = '';
        getMax(inpValue);
    }

    function getMax(str) {
        var str=str.trim();
        if (str.length == 0) {
            alert('请输入数组')
        } else {
            var arr = str.split(',');
            //计数
            var count = {};
            //索引
            var pos = {};
            for (var i = 0; i < arr.length; i++) {
                var char = arr[i];
                if (count[char]) { //object对象的key不会重复
                    count[char] += 1;
                    pos[char] += ',' + i;
                } else {
                    count[char] = 1;
                    pos[char] = i;
                }
            }
            //对出现的次数降序排列
            var sortKey = Object.keys(count).sort(function (a, b) {
                return count[a] <= count[b];
            });
            console.log(sortKey);
            var max = count[sortKey[0]];
            //存放出现次数最多的字符
            var max_arr = [];
            for (i in count) {
                if (count[i] >= max) {
                    max = count[i];
                    max_arr.push(i);
                }
            }
            document.getElementById('maxValue').innerHTML = '出现次数最多的字符是' + max_arr;
            for (var i = 0; i < max_arr.length; i++) {
                var key = max_arr[i];
                document.getElementById('count').innerHTML += key + '出现的次数为:' + count[key] + '<br>';
                document.getElementById('pos').innerHTML += key + '出现的位置为:' + pos[key] + '<br>';
            }
        }
    }
}