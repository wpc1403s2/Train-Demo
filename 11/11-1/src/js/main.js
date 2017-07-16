/**
 * Created by wpc on 2017/5/3.
 */
function carousel() {
    var bannerWrap = document.getElementById('bannerWrap');
    var banner_ul = document.getElementById('bannerBox');
    var ulLis = banner_ul.children;
    // 做无缝滚动，克隆第一张，放到最后一张后面去
    banner_ul.appendChild(banner_ul.children[0].cloneNode(true));
    var ol = document.createElement('ol');
    bannerWrap.appendChild(ol);
    for (var i = 0; i < ulLis.length - 1; i++) {
        var li = document.createElement('li');

        ol.appendChild(li)
    }
    ol.children[0].className = 'switch-active';
    //3. 开始动画部分
    var olLis = ol.children;
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].index = i;
        olLis[i].onmouseover = function () {
            for (var j = 0; j < olLis.length; j++) {
                olLis[j].className = '';
            }
            this.className = 'switch-active';
            animate(banner_ul, -this.index * 750);
            square = key = this.index;
        }
    }
    var timer = null;
    var key = 0;
    var square = 0;
    timer = setInterval(autoplay, 2000);
    function autoplay() {
        key++;
        if (key > ulLis.length - 1) {
            document.getElementById('bannerBox').style.left = 0;
            key = 1;
        }
        animate(banner_ul, -key * 750);
        square++;
        if (square > olLis.length - 1) {
            square = 0;
        }
        // console.log(square);
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = '';
        }
        olLis[square].className = 'switch-active';
    }

    bannerWrap.onmouseover = function () {
        clearInterval(timer)
    }
    bannerWrap.onmouseout = function () {
        timer = setInterval(autoplay, 2000)
    }
}
carousel();

function gotop() {
    var upTop = document.getElementById('upTop');
    var goTop = document.getElementById('goTop');

    window.onscroll = function () {
        leader = scroll().top
    }
    var leader = 0, target = 0, timer = null;
    // leader 起始位置  target  目标位置
    upTop.onclick = function () {
        target = 0;
        timer = setInterval(function () {
            leader = leader + (target - leader) / 10;
            console.log(leader)
            window.scrollTo(0, leader);
            if (leader == target) {
                clearInterval(timer);
            }
        })
    }
}
gotop()