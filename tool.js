//全局变量1111111111111111111111111111
var doc = document;//优化Dom
var win = window;
var clientW = doc.documentElement.clientWidth || doc.body.offsetWidth; //可视区兼容
var clientH = doc.documentElement.clientHeight || doc.body.offsetHeight;
//2017.2.17兼容手持设备的浏览。
function clientWH() {
    if (clientH > clientW*0.8)
    {
        clientH = clientW*0.8;
    }
}
//class
function getClass(obj,classname)
{
    var res = [];
    var all = obj.getElementsByTagName('*');
    for (var i = 0; i<all.length; i++)
    {
        if ( all[i].className.split(' ').indexOf(classname) != -1 )//0也是false
        {
            res.push(all[i]);
        }
    }
    return res;
}
//
function getId(obj,id)
{
    return obj.getElementById(id);
}
//
function delClassName(obj,del)
{
    var name = obj.className.split(' ');
    for( var i=0; i<name.length; i++ )
    {
        if (name[i] == del)
        {
            name.splice(i,1);
        }
    }
    obj.className = name.join(' ');
}
//
function addtimeClassName(obj,del)
{
    var name = obj.className.split(' ');
    for( var i=0; i<name.length; i++ )
    {
        if (name[i] == del)
        {
            name.splice(i,1);
        }
    }
    obj.className = name.join(' ');
}
//获取绝对位置 没用上
function getPos(obj,LorT) {
    var res = 0;
    while (obj)
    {
        res += obj['offset'+ LorT +''];
        obj = obj.offsetParent;
    }
    return res;
}
//获取样式
function getsty(obj,sty) {
    if (obj.currentStyle)
    {
        return parseInt(obj.currentStyle[sty]);
    }
    else
    {
        return parseInt(getComputedStyle(obj,null)[sty]);
    }
}
//变换累加//有累加角度的效果，不实用。
function trans(obj,type) {
    obj.style.transform = obj.style.transform + type;
}
//排序
function zuida(num) {
    var max = 0;
    for (var i = 0; i<num.length; i++)
    {
        if ( Number(num[i]) > max)
        {
            max = Number(num[i]);
        }
    }
    return max;
}
//0
function su0(num) {
    var add0 = '';
    for ( var i=1; i<num; i++)
    {
        add0 += '0'
    }
    return Number(1+add0);
}
//
function add0(zero) {
    if (zero < 10)
    {
        return '0'+zero;
    }
    else
    {
        return zero +'';
    }
}
//copy
function copy(a,b) {
    for (var i in a)
    {
        b[i] = a[i];
    }
}
