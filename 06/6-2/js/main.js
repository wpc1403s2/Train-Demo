/**
 * Created by wpc on 2017/5/17.
 */
var BorderColor = document.querySelector('.themeBorderColor');
var TextColor = document.querySelectorAll('.themeTextColor');
var innerTheme = document.querySelectorAll('.innerTheme');
var bgColor = document.querySelector('.themebackgroundColor');
var sicon = document.querySelector('#s-sicon');

//测试本地存储是否已被填充
if(!localStorage.getItem('themecolor')){
    populateStorage();
}else {
    setStyles()
}
//在存储中设置值
function populateStorage() {
    console.log(this.value);
    localStorage.setItem('themecolor', this.value);
    setStyles()
}
//设置样式
function setStyles() {
    var currentColor = localStorage.getItem('themecolor');
    BorderColor.style.borderTopColor='#'+currentColor;
    bgColor.style.backgroundColor = '#' + currentColor;
    sicon.style.borderTopColor='#'+currentColor;
    sicon.style.borderRightColor='#'+currentColor;

    for(var i=0;i<TextColor.length;i++){
        TextColor[i].style.color = '#' + currentColor;
    }

}
//绑定事件
for(var i=0; i<innerTheme.length;i++){
    innerTheme[i].onclick = populateStorage;
}


