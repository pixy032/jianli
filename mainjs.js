window.onload = function () {
    var oDiv3d = doc.getElementById('mawari');
    var x = new moto(getClass(oDiv3d,'main'),getClass(doc,'button'));
    window.onresize = function () {
        clientH = doc.documentElement.clientHeight || doc.body.offsetHeight;//重新获取可视区高度
        clientW = doc.documentElement.clientWidth || doc.body.clientWidth;
        x.init();
    };
};
function moto(obj,but) {
    this.adiv3d = obj;
    this.abut = but;
    this.initKai();
}
moto.prototype = {
    "initKai": function () {
        this.kakudo = 0;
        this.num = 0;
        this.allnum = 0;
        for (var i = 0; i < this.adiv3d.length; i++) {
            this.adiv3d[i].style.width = clientH - getsty(this.adiv3d[i], 'borderLeftWidth') * 2 + 'px';//火狐语法严格...
            this.adiv3d[i].style.height = clientH - getsty(this.adiv3d[i], 'borderTopWidth') * 2 + 'px';
        }
        this.fatdiv = this.adiv3d[0].parentNode;
        this.p3_butai = getId(doc,'p3_2');
        this.p3_fat = this.p3_butai.children[0];
        this.p3_img = getClass(this.adiv3d[3],'img3d');
        this.fat_play = getId(doc,'p3_3');
        this.play_Load = this.fat_play.children[0];
        this.player =this.fat_play.children[1];
        this.player.volume = 1;
        this.p5_oto100W = getId(doc,'oto100');
        this.p5_otoMove = this.p5_oto100W.children[0];
        this.playTimeC = getClass(this.fat_play,'pTime')[0];
        this.playOnOff = true;
        this.pLi_index = 0;
        this.pLi = [];

        this.nav = getId(doc,'nav_li');
        this.aNavLi = this.nav.getElementsByTagName('li');
        this.aNavMenu = getClass(this.adiv3d[0],'menu0');
        this.NavInput = getClass(this.adiv3d[0],'search')[0].children[1];
        this.navInOut = getId(doc,'inOut');
        this.akanPanUl = getClass(this.adiv3d[0],'kanPan');
        this.kanPanAll = getId(doc,'kanPan');
        this.akanPanLi = this.akanPanUl[0].getElementsByTagName('li');
        this.akanPanList = this.akanPanUl[1].getElementsByTagName('li');
        this.label0 = getClass(this.adiv3d[0],'label')[0];
        this.label0_Li = this.label0.getElementsByTagName('li');
        this.label0_Div = this.label0.getElementsByTagName('div');
        this.label1 = getClass(this.adiv3d[0],'labelMain')[0];
        this.label1_Li = getClass(this.label1,'labelPage');
        this.toper = getId(doc,'toper');
        for (var i=0; i<this.label0_Li.length-1; i++)
        {
            this.label0_Li[i].cName = this.label0_Li[i].className;
        }
        this.label0_Li[0].className = 'firstLab actLab point';
        this.p0_num = 0;
        this.navNum0 = 0;
        this.tabNum = 0;
        this.tabNum1 = 1;
        this.tabNum2 = 0;
        this.labNum0 = 0;
        this.tabOnOff = true;

        this.p5_otoMove.style.left = this.p5_oto100W.clientWidth - this.p5_otoMove.offsetWidth + 'px';
        
        this.loadAll = getId(doc,'load');
        this.loadOpacity = 1;
        this.loadSpan = this.loadAll.children[0];
        this.loadDiv = this.loadAll.children[1];
        this.loadNum = 0;
        this.loadNum100 = 0;
        this.imgLoad();
        for (var i=0; i<pic.length; i++)
        {
            this.p3_img[i].src = pic[i];
        }
        this.playTimeDura();
        this.autoTabint();
    },
    "imgLoad": function () {
        var this0 = this;
        this.imgTemp = [];
        this.arrImg = pic.concat(backback);
        for (var i=0; i<this.arrImg.length; i++)
        {
            this.imgTemp[i] = new Image();
            this.imgTemp[i].src = this.arrImg[i];
            this.imgTemp[i].onload = function () {
                this0.loadNum++;
                this0.loadNum100 = 100/this0.imgTemp.length*this0.loadNum;
                this0.loadSpan.innerHTML = 'Loading... '+parseInt(this0.loadNum100)+'%';
                this0.loadDiv.style.width = clientW * this0.loadNum100*0.01 + 'px';
                if (this0.loadNum == this0.arrImg.length)
                {
                    this0.init();
                    this0.loadTime = setInterval(function () {
                        this0.loadSetInterval();
                    },30)
                }
            }
        }
    },
    "loadSetInterval": function () {
        if (this.loadOpacity <= 0.01)//浮点误差有；
        {
            clearInterval(this.loadTime);
            this.loadAll.style.display = 'none';
        }
        this.loadOpacity -= 0.1;
        this.loadAll.style.opacity = this.loadOpacity;
    },
    "init": function () {
        //父级以及舞台
        this.fatdiv.style.cssText = 'width:' + clientH + 'px; height:' + clientH + 'px; transform-style:preserve-3d;';
        this.fatdiv.style.transform = 'translateZ(' + -clientH / 2 + 'px)';
        this.fatdiv.parentNode.style.cssText = 'perspective:' + clientH * 2 + 'px';
        //原始字号
        doc.body.style.fontSize = clientH * 0.02 + 'px';
        doc.body.style.background = 'url("'+backback[Math.abs(this.kakudo/90)%backback.length]+'") no-repeat center';
        doc.body.style.backgroundSize = 'cover';
        //
        this.posLeft = (clientW - clientH) / 2;
        //主要
        for (var i = 0; i < this.adiv3d.length; i++) {
            this.adiv3d[i].style.width = clientH - getsty(this.adiv3d[i], 'borderLeftWidth') * 2 + 'px';//火狐语法严格...
            this.adiv3d[i].style.height = clientH - getsty(this.adiv3d[i], 'borderTopWidth') * 2 + 'px';
            this.adiv3d[i].style.backfaceVisibility = 'hidden';
            this.adiv3d[i].realclass = this.adiv3d[i].className;
        }
        //按钮
        this.abut[0].style.cssText = 'width:' + clientH / 10 + 'px; height:' + clientH / 10 + 'px;';
        this.abut[1].style.cssText = 'width:' + clientH / 10 + 'px; height:' + clientH / 10 + 'px;';
        this.abut[0].style.left = (clientW - clientH) / 2 - clientH / 10 + 'px';
        this.abut[1].style.left = (clientW - clientH) / 2 + clientH + 'px';
        this.abut[0].style.top = (clientH-clientH/10)/2 + 'px';
        this.abut[1].style.top = (clientH-clientH/10)/2 + 'px';
        this.butLeft0 = (clientW - clientH) / 2 - clientH / 10;
        this.butLeft1 = (clientW - clientH) / 2 + clientH;
        this.butAttrL = clientW*0.5 - clientH*0.65;
        this.butAttrR = clientW*0.5 + clientH*0.55;
        this.butSpeed = 0;
        //3d
        this.adiv3d[0].style.transform = 'translateZ(' + clientH / 2 + 'px)';
        this.adiv3d[1].style.transformOrigin = '0 0';
        this.adiv3d[1].style.transform = 'translateZ(' + clientH / 2 + 'px) rotateX(-90deg)';
        this.adiv3d[2].style.transformOrigin = '0 100%';
        this.adiv3d[2].style.transform = 'translateZ(' + clientH / 2 + 'px) rotateX(90deg)';
        this.adiv3d[3].style.left = -clientH + 'px';
        this.adiv3d[3].style.transformOrigin = '100% 0';
        this.adiv3d[3].style.transform = 'translateZ(' + clientH / 2 + 'px) rotateY(-90deg)';
        this.adiv3d[4].style.left = clientH + 'px';
        this.adiv3d[4].style.transformOrigin = '0 0';
        this.adiv3d[4].style.transform = 'translateZ(' + clientH / 2 + 'px) rotateY(90deg)';
        this.adiv3d[5].style.transformOrigin = '50% 0';
        this.adiv3d[5].style.transform = 'translateZ(-' + clientH / 2 + 'px) rotateY(180deg)';
        //累加
        this.numkai = this.kakudo;
        this.gen = clientH / 2;
        //缩放
        this.onep = (clientH / 1.4 - clientH / 2) / 90 * 2.5;
        this.offon = true;
        //
        this.run();
        this.fatdiv.style.transform = 'translateZ(' + -clientH / 2 + 'px) rotateY(' + this.kakudo + 'deg)';
        //
        this.normal_p0();
        this.canvas_p4();
        this.window_p3();
        this.about_p5();
    },
    "normal_p0" : function () {
        var this0 = this;
        for(var i=1; i<this.aNavLi.length-1; i++)
        {
            this.aNavLi[i].index = i;
            if(i<this.aNavMenu.length+1)
            {
                this.aNavMenu[i-1].index = i;
            }
            this.aNavLi[i].onmouseover = function () {
                clearTimeout(this0.p0_timeNone);
                this0.p0_timeBlock = setTimeout(this0.navBlock(this.index),500)
            };
            this.aNavLi[i].onmouseout = function () {
                clearTimeout(this0.p0_timeBlock);
                this0.p0_timeNone = setTimeout(this0.navNone(this.index),500)
            };
            this.aNavMenu[i-1].onmouseover = function () {
                clearTimeout(this0.p0_timeNone);
            };
            this.aNavMenu[i-1].onmouseout = function () {
                clearTimeout(this0.p0_timeBlock);
                this0.p0_timeNone = setTimeout(this0.navNone(this.index),500)
            }
        }
        this.NavInput.onfocus = function () {
            clearInterval(this0.searchTime0);
            this0.NavSearch(20);
        };
        this.NavInput.onblur = function () {
            clearInterval(this0.searchTime0);
            this0.NavSearch(-20);
        };
        this.kanPanAll.onmouseover = function () {
            clearInterval(this0.autoTabTime);
        };
        this.kanPanAll.onmouseout = function () {
            this0.autoTabTime = setInterval(function () {
                this0.autoTab();
            },8000)
        };
        for (var i=0; i<this.akanPanLi.length; i++)
        {
            this.akanPanList[i].index = i;
            this.akanPanLi[i].index = i;
            this.akanPanList[i].onclick = function () {//执行差值；
                if (this0.tabOnOff)
                {
                    this0.tabNum2 = this.index;
                    if ( this0.tabNum - this0.tabNum2 == 0)
                    {
                        return;
                    }
                    else if( (this0.tabNum2 - this0.tabNum)>0 )
                    {
                        this0.handTabB(this0.akanPanLi[0].offsetWidth);
                        this0.autoTabLeft = setInterval(function () {
                            this0.autoTab1();
                        },20)
                    }
                    else
                    {
                        this0.handTabB(-this0.akanPanLi[0].offsetWidth);
                        this0.autoTabRight = setInterval(function () {
                            this0.autoTab2();
                        },20)
                    }
                    this0.tabNum = this.index;
                }
            }
        }
        clearInterval(this.autoTabTime);
        this.autoTabTime = setInterval(function () {
            this0.autoTab();
        },5000);
        for (var i=0; i<this.label0_Li.length-1; i++)
        {
            this.label0_Li[i].index = i;
            this0.label0_Li[i].onclick = function () {
                this0.label0_Div[this0.labNum0].className = '';
                this0.label0_Li[this0.labNum0].className = this0.label0_Li[this0.labNum0].cName;
                this0.label1_Li[this0.labNum0].style.display = 'none';
                this0.label0_Li[this.index].className = this.cName + ' actLab';
                this0.label0_Div[this.index].className = 'act';
                this0.label1_Li[this.index].style.display = 'block';
                this0.labNum0 = this.index;
            }
        }
        this.toperTop = clientH - this.toper.offsetHeight;
        this.toper.style.top = this.toperTop + this.adiv3d[0].scrollTop + 'px';
        if (navigator.userAgent.indexOf("Firefox")>0)
        {
            this.adiv3d[0].addEventListener('DOMMouseScroll',this.scroll(),false);//this指向改变；滚轮调试bug注意；
        }
        else
        {
            this.adiv3d[0].addEventListener('mousewheel',this.scroll(),false);
        }
        this.adiv3d[0].addEventListener('scroll',this.scroll(),false);
        this.toper.onclick = function () {
            this0.adiv3d[0].scrollTop = 0;
            this0.toper.style.top = this0.toperTop + 'px';
        }
    },
    "scroll": function () {
        var this0 = this;
        return function () {
            this0.toper.style.top = this0.toperTop + this0.adiv3d[0].scrollTop + 'px';
        }
    },
    "autoTab": function () {
        var this0 = this;
        clearInterval(this.autoTabRight);
        clearInterval(this.autoTabLeft);
        this0.tabNum++;
        this0.tabNum1++;
        if( this.tabNum > this.akanPanLi.length-1 || this.tabNum == 0 )
        {
            this0.tabNum = 0;
            this.akanPanLi[this.akanPanLi.length-1].style.zIndex = this.tabNum1;
            this.akanPanLi[this.akanPanLi.length-1].style.left = 0;
            this.akanPanList[this.akanPanLi.length-1].style.backgroundColor = '#b6c8d5';
            this.akanPanLi[this.tabNum].style.left = this.akanPanLi[0].offsetWidth + 'px';
            this.akanPanList[this.tabNum].style.backgroundColor = '#5e6065';
        }
        else {
            this.akanPanLi[this.tabNum-1].style.zIndex = this.tabNum1;
            this.akanPanLi[this.tabNum-1].style.left = 0;
            this.akanPanList[this.tabNum-1].style.backgroundColor = '#b6c8d5';
            this.akanPanLi[this.tabNum].style.left = this.akanPanLi[0].offsetWidth + 'px';
            this.akanPanList[this.tabNum].style.backgroundColor = '#5e6065';
        }
        this.akanPanUl[0].style.left = 0;
        this.autoTabLeft = setInterval(function () {
            this0.autoTab1();
        },20)
    },
    "autoTabint": function () {
        this.akanPanLi[this.tabNum].style.zIndex = this.tabNum1;
        this.akanPanLi[this.tabNum].style.left = 0;
        this.akanPanList[this.tabNum].style.backgroundColor = '#5e6065';
    },
    "handTabB": function (a) {
        this.tabNum1++;
        this.tabOnOff = false;
        this.akanPanLi[this.tabNum].style.zIndex = this.tabNum1;
        this.akanPanLi[this.tabNum].style.left = 0;
        this.akanPanList[this.tabNum].style.backgroundColor = '#b6c8d5';
        this.akanPanLi[this.tabNum2].style.left = a + 'px';
        this.akanPanList[this.tabNum2].style.backgroundColor = '#5e6065';
        this.akanPanUl[0].style.left = 0;
        clearInterval(this.autoTabRight);
        clearInterval(this.autoTabLeft);
    },
    "autoTab1" : function () {
        if (this.akanPanUl[0].offsetLeft <= -this.akanPanLi[0].offsetWidth+10 )
        {
            clearInterval(this.autoTabLeft);
            this.akanPanUl[0].style.left = -this.akanPanLi[0].offsetWidth-1+ 'px';//CSS百分比反应时间误差；1px误差
            this.tabOnOff = true;
        }
        else
        {
            this.akanPanUl[0].style.left = this.akanPanUl[0].offsetLeft - 10 + 'px';
        }
    },
    "autoTab2" : function () {
        if (this.akanPanUl[0].offsetLeft >= this.akanPanLi[0].offsetWidth-10 )
        {
            clearInterval(this.autoTabRight);
            this.akanPanUl[0].style.left = this.akanPanLi[0].offsetWidth +1+ 'px';
            this.tabOnOff = true;
        }
        else
        {
            this.akanPanUl[0].style.left = this.akanPanUl[0].offsetLeft + 10 + 'px';
        }
    },
    "NavSearch" : function (a) {
        var this0 = this;
        this.searchTime0 = setInterval(function () {
            this0.navNum0 = this0.navNum0+a;
            if ( a>0 && this0.navNum0 > 300 )
            {
                clearInterval(this0.searchTime0)
            }
            else if ( a<0 && this0.navNum0 < 0 )
            {
                clearInterval(this0.searchTime0)
            }
            else
            {
                this0.navInOut.style.height = this0.navNum0 + '%';
            }
        },20)
    },
    "navBlock": function (i) {//定时器传参好麻烦；
        var this0 = this;
        return function (){
            this0.aNavMenu[this0.p0_num].style.display = 'none';//中止定时器执行后补上清除前个
            this0.aNavMenu[i-1].style.display = 'block';
            this0.p0_num = i-1;
        }
    },
    "navNone" : function (i) {
        var this0 = this;
        return function (){
            this0.aNavMenu[this0.p0_num].style.display = 'none';
            this0.aNavMenu[i-1].style.display = 'none';
            this0.p0_num = i-1;
        }
    },
    "run": function () {
        var this0 = this;
        this.abut[0].onmouseover = function () {
            clearInterval(this.time);
            this0.butOver(this,this0.butAttrL);
        };
        this.abut[0].onmouseout = function () {
            clearInterval(this.time);
            this.style.left = this0.butLeft0 + 'px';
        };
        this.abut[1].onmouseover = function () {
            clearInterval(this.time);
            this0.butOver(this,this0.butAttrR);
        };
        this.abut[1].onmouseout = function () {
            clearInterval(this.time);
            this.style.left = this0.butLeft1 + 'px';
        };
        this.abut[0].onclick = function () {
            if (this0.offon) {
                this0.numkai = this0.kakudo;
                this0.kakudo = this0.kakudo - 90;
                clearInterval(this0.time0);
                clearInterval(this0.time1);
                this0.time0 = setInterval(function () {
                    this0.click0();
                }, 20);
            }
        };
        this.abut[1].onclick = function () {
            if (this0.offon) {
                this0.numkai = this0.kakudo;
                this0.kakudo = this0.kakudo + 90;
                clearInterval(this0.time0);
                clearInterval(this0.time1);
                this0.time1 = setInterval(function () {
                    this0.click0();
                }, 20);
            }
        }
    },
    "click0": function () {
        if (this.kakudo < this.numkai) {
            this.num--;
            if (this.num <= this.kakudo) {
                this.clickIf(this.time0);
            }
            else {
                this.clickElse();
            }
        }
        else {
            this.num++;
            if (this.num >= this.kakudo) {
                this.clickIf(this.time1);
            }
            else {
                this.clickElse();
            }
        }
    },
    "clickIf": function (x) {
        this.offon = true;
        clearInterval(x);
        for (var i = 0; i < this.adiv3d.length; i++) {
            this.adiv3d[i].style.backfaceVisibility = 'hidden';
            this.adiv3d[i].className = '' + this.adiv3d[i].realclass + '';
        }
        if (this.kakudo%360 == 0)//chrome bug (＞д＜);
        {
            this.adiv3d[0].style.overflow = 'auto';
        }
        else
        {
            this.adiv3d[0].style.overflow = 'hidden';
        }
        if (this.kakudo%360 == 0)
        {
            doc.body.style.background = 'url("'+backback[0]+'") no-repeat center';
            doc.body.style.backgroundSize = 'cover';
        }
        else if (this.kakudo>0)
        {
            if(this.kakudo/90%backback.length==1)
            {
                doc.body.style.background = 'url("'+backback[1]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
            else if (this.kakudo/90%backback.length==2)
            {
                doc.body.style.background = 'url("'+backback[2]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
            else if (this.kakudo/90%backback.length==3)
            {
                doc.body.style.background = 'url("'+backback[3]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
        }
        else if (this.kakudo<0)
        {
            if(this.kakudo/90%backback.length == -1)
            {
                doc.body.style.background = 'url("'+backback[3]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
            else if (this.kakudo/90%backback.length == -2)
            {
                doc.body.style.background = 'url("'+backback[2]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
            else if (this.kakudo/90%backback.length == -3)
            {
                doc.body.style.background = 'url("'+backback[1]+'") no-repeat center';
                doc.body.style.backgroundSize = 'cover';
            }
        }
        this.fatdiv.style.transform = 'translateZ(' + -clientH / 2 + 'px) rotateY(' + this.num + 'deg)'
    },
    "clickElse": function () {
        this.offon = false;
        this.colorone = this.colorone + 0.02;
        if (Math.abs(this.kakudo - this.num) < 45) {
            this.gen = this.gen - this.onep;
        }
        else {
            this.gen = this.gen + this.onep;
        }
        for (var i = 0; i < this.adiv3d.length; i++) {
            this.adiv3d[i].style.backfaceVisibility = 'visible';
            this.adiv3d[i].className = '' + this.adiv3d[i].realclass + ' dborder';
        }
        this.fatdiv.style.transform = 'translateZ(' + -this.gen + 'px) rotateY(' + this.num + 'deg)';
    },
    "butOver": function (obj,attr) {
        var this0 = this;
        if (attr - obj.offsetLeft < 0)
        {
            this.butSpeed = -2;
            obj.time = setInterval(function () {
                this0.moveL(obj,attr);
            },30)
        }
        else
        {
            this.butSpeed = 2;
            obj.time = setInterval(function () {
                this0.moveR(obj,attr);
            },30)
        }

    },
    "moveL": function (obj,attr) {
        if (obj.offsetLeft <= attr)
        {
            obj.style.left = this.butLeft0 + 'px';
        }
        obj.style.left = obj.offsetLeft + this.butSpeed + 'px';
    },
    "moveR": function (obj,attr) {
        if (obj.offsetLeft >= attr)
        {
            obj.style.left = this.butLeft1 + 'px';
        }
        obj.style.left = obj.offsetLeft + this.butSpeed + 'px';
    },
    "window_p3": function () {
        //p3初始化
        var this0 = this;
        this.p3_1 = getId(doc,'p3_1');
        this.p3elements = this.adiv3d[3].children;
        for (var i = 0; i < 3; i++) {
            this.p3elements[i].style.left = clientH * 0.1 + 'px';
            this.p3elements[i].style.top = (i + 1) * clientH * 0.05 + this.p3elements[i].offsetHeight * i + 'px';
            new p3win(this.p3elements[i], this.posLeft);
        }
        this.ziding = getClass(this.adiv3d[3], 'ziding');
        this.ziding[0].children[0].max = '' + clientH + '';
        this.ziding[1].children[0].max = '' + clientW + '';
        this.ziding[2].children[0].max = '' + clientW - clientW * 0.5 + '';
        this.ziding[3].children[0].max = '' + clientH - clientH * 0.5 + '';
        this.ziding[0].children[1].innerHTML = '' + clientH + '';
        this.ziding[1].children[1].innerHTML = '' + clientW + '';
        this.ziding[2].children[1].innerHTML = '' + clientW - clientW * 0.5 + '';
        this.ziding[3].children[1].innerHTML = '' + clientH - clientH * 0.5 + '';
        //播放器
        this.con = getId(doc,'con');
        this.playOpen = getId(doc,'open');
        this.p5_playMoveFat = getId(doc,'play_move');
        this.p5_playMove = this.p5_playMoveFat.children[0];
        this.p5_play = getId(doc,'play');
        this.p5_oto = getId(doc,'oto');
        this.p5_replay = getId(doc,'replay');
        this.p5_full = getId(doc,'full_half');
        this.p5_full_hd = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        this.player.width = this.fat_play.offsetWidth;
        this.player.height = this.fat_play.offsetHeight;
        this.p5_otoMove.style.left = (this.p5_oto100W.clientWidth - this.p5_otoMove.offsetWidth) * this.player.volume+ 'px';//音量
        //
        this.playerTTT();
        this.playerBenRi();
        this.player.oncontextmenu = function () {
            return false;
        };
        this.playOpen.onclick = function () {
            if (this0.playOnOff)
            {
                this0.playList = doc.createElement('div');
                this0.playList.className = 'playList';
                this0.playListUl = doc.createElement('ul');
                for (var i = 0; i<madia.length; i++)
                {
                    this0.pLi[i] = doc.createElement('li');
                    this0.pLi[i].index = i;
                    this0.pLi[i].className = 'pLi';
                    this0.pLi[i].innerHTML = madia[i];
                    this0.playListUl.appendChild(this0.pLi[i]);
                    this0.pLi[i].onclick = function () {
                        clearInterval(this0.player_timer);
                        this0.playLoad(this.index);
                        this0.pLi[this0.pLi_index].style.color = 'black';
                        this.style.color = 'red';
                        this0.pLi_index = this.index;
                    }
                }
                this0.pLi[this0.pLi_index].style.color = 'red';
                this0.playList.appendChild(this0.playListUl);
                this0.fat_play.appendChild(this0.playList);
                //
                this0.playList.onmouseover = function () {
                    clearTimeout(this0.timetimetime);
                };
            }
            else
            {
                this0.fat_play.removeChild(this0.playList)
            }
            this0.playOnOff = !this0.playOnOff;
        };
        this.p5_play.onclick = function () {
            clearInterval(this0.player_timer);
            if( this0.player.paused )
            {
                this0.player.play();
                this.style.background = 'url("./img/p2.png") no-repeat center';
                this.style.backgroundSize = 'contain';
                this0.player_timer = setInterval(function () {
                    this0.playerTTT();
                },1000);
            }
            else
            {
                this0.player.pause();
                this.style.background = 'url("./img/p1.png") no-repeat center';
                this.style.backgroundSize = 'contain';
            }
        };
        this.player.onclick = function () {
            clearInterval(this0.player_timer);
            if( this0.player.paused )
            {
                this0.player.play();
                this0.p5_play.style.background = 'url("./img/p2.png") no-repeat center';
                this0.p5_play.style.backgroundSize = 'contain';
                this0.player_timer = setInterval(function () {
                    this0.playerTTT();
                },1000);
            }
            else
            {
                this0.player.pause();
                this0.con.style.bottom = '0';
                this0.fat_play.style.cursor = 'default';
                this0.p5_play.style.background = 'url("./img/p1.png") no-repeat center';
                this0.p5_play.style.backgroundSize = 'contain';
            }
        };
        this.player.onwaiting = function () {
            this0.play_Load.style.display = 'block';
        };
        this.player.oncanplaythrough = function () {
            this0.play_Load.style.display = 'none';
        };
        this.player.onended = function () {
            this0.p5_play.style.background = 'url("./img/p1.png") no-repeat center';
            this0.p5_play.style.backgroundSize = 'contain';
        };
        this.p5_oto.onclick = function () {
            if( this0.player.muted )
            {
                this0.player.muted = false;
                this.style.background = 'url("./img/d1.png") no-repeat center';
                this.style.backgroundSize = 'contain';
            }
            else
            {
                this0.player.muted = true;
                this.style.background = 'url("./img/d2.png") no-repeat center';
                this.style.backgroundSize = 'contain';
            }
        };
        this.p5_replay.onclick = function () {
            if( this0.player.loop )
            {
                this0.player.loop = false;
                this.style.background = 'url("./img/r1.png") no-repeat center';
                this.style.backgroundSize = 'contain';
            }
            else
            {
                this0.player.loop = true;
                this.style.background = 'url("./img/r2.png") no-repeat center';
                this.style.backgroundSize = 'contain';
            }
        };
        this.p5_full.onclick = function () {
            this0.fullhalf();
        };
        this.player.ondblclick = function () {
            this0.fullhalf();
        };
        this.playdrag(this.p5_otoMove,this.p5_oto100W,this.player);//音量
        if (this0.p5_full_hd)
        {
            this.p5_kyori = this.p5_oto100W.offsetLeft;
            this.p5_kyori0 = 0;
        }
        else {
            this.p5_kyori = this.posLeft - clientH * 0.1 + this.p5_oto100W.offsetLeft;
            this.p5_kyori0 = this.posLeft - clientH * 0.1;
        }
        this.p5_oto100W.onclick = function (ev) {
            this0.p5_oto100W_oev = ev||window.event;
            this0.p5_oto100W_XY = this0.p5_oto100W_oev.clientX - this0.p5_kyori;
            if (this0.p5_oto100W_XY < this0.p5_otoMove.offsetWidth/2)
            {
                this0.p5_oto100W_XY = this0.p5_otoMove.offsetWidth/2;
            }
            else if (this0.p5_oto100W_XY > this0.p5_oto100W.clientWidth - this0.p5_otoMove.offsetWidth)
            {
                this0.p5_oto100W_XY = this0.p5_oto100W.clientWidth - this0.p5_otoMove.offsetWidth + this0.p5_otoMove.offsetWidth/2;
            }
            this0.p5_otoMove.style.left = this0.p5_oto100W_XY - this0.p5_otoMove.offsetWidth/2 + 'px';
            this0.player.volume = this0.p5_otoMove.offsetLeft / (this0.p5_oto100W.clientWidth - this0.p5_otoMove.offsetWidth);
        };//音量
        this.p5_playMoveFat.onmousedown = function () {
            doc.onmouseup = function (ev) {
                this0.playEv = ev || window.event;
                this0.p5_playMoveX = this0.playEv.clientX - this0.p5_kyori0;
                if (this0.p5_playMoveX > this0.p5_playMoveFat.offsetWidth-this0.p5_playMoveFat.offsetWidth*0.01)
                {
                    this0.p5_playMoveX = this0.p5_playMoveFat.offsetWidth;
                }
                else if (this0.p5_playMoveX < this0.p5_playMoveFat.offsetWidth*0.01)
                {
                    this0.p5_playMoveX = 0;
                }
                this0.p5_playMove.style.width = this0.p5_playMoveX + 'px';
                this0.p5_playMoveBeilv = this0.p5_playMove.offsetWidth/this0.p5_playMoveFat.offsetWidth;
                this0.player.currentTime = this0.p5_playMoveBeilv*this0.player.duration;
                this0.player.play();
                this0.p5_play.style.background = 'url("./img/p2.png") no-repeat center';
                this0.p5_play.style.backgroundSize = 'contain';
                clearInterval(this0.player_timer);
                this0.player_timer = setInterval(function () {
                    this0.playerTTT();
                },1000);
                doc.onmouseup = null;
            };
        };
        this.p5_playMove.style.width = this.p5_playMoveBeilv*this.p5_playMoveFat.offsetWidth + 'px';
        //
        this.arrCheck = getClass(doc,'check');
        this.p3_close_x = getClass(this.adiv3d[3],'close');
        this.p3_close_x[0].onclick = function () {
            this0.p3_1.style.display = 'none';
        };
        this.playClose = getClass(this.adiv3d[3],'close')[2];
        this.p3_img_close = getClass(this.adiv3d[3],'close')[1];
        this.playClose.onclick = function () {
            clearTimeout(this0.timetimetime);
            clearInterval(this0.player_timer);
            this0.player.pause();
            this0.p5_play.style.background = 'url("./img/p1.png") no-repeat center';
            this0.p5_play.style.backgroundSize = 'contain';
            this0.fat_play.style.top = '200%';
            if (this0.p5_full_hd)
            {
                if (document.exitFullscreen)
                {
                    document.exitFullscreen();
                }
                else if (document.webkitExitFullscreen)
                {
                    document.webkitExitFullscreen();
                }
                else if (document.mozCancelFullScreen)
                {
                    document.mozCancelFullScreen();
                }
            }
        };
        for (var i = 0; i < this.ziding.length; i++) {
            this.ziding[i].children[2].innerHTML = '' + this.ziding[i].children[0].value + '';
            this.ziding[i].children[0].addEventListener('change',this0.change,false);
        }
        this.p3elements[3].onclick = function () {
            this0.modoru();
        };
        this.p3elements[0].ondblclick = function () {//注意display = none 是加不上定位的
            this0.allnum++;
            this0.p3_1.style.display = 'block';
            this0.p3_1.style.zIndex = this0.allnum;
        };
        this.p3elements[1].ondblclick = function () {
            this0.allnum++;
            this0.fat_play.style.top = '10%';
            this0.con.style.bottom = '0';
            this0.fat_play.style.cursor = 'default';
            this0.fat_play.style.zIndex = this0.allnum;
        };
        //
        this0.p3_3dimg();
        this.p3elements[2].ondblclick = function () {
            clearInterval(this0.p3_3dimg_timer);
            clearInterval(this0.up_timer);
            this0.allnum++;
            this0.p3_butai.style.display = 'block';
            this0.p3_butai.style.zIndex = this0.allnum;
            this0.p3_kasaX = 0;
            this0.p3_kasaY = 0;
            this0.moveClientYre = 0;
            this0.moveClientXre = 0;
            this0.p3_3dimg();
            this0.p3_3dimgKai();
        };
        this.p3_butai.onmousedown = function (ev) {
            clearInterval(this0.up_timer);
            doc.onmouseup = null;
            this0.p3_oev = ev || window.event;
            this0.downClientX = this0.p3_oev.clientX;
            this0.downClientY = this0.p3_oev.clientY;
            this0.moveClientX = this0.p3_oev.clientX;
            this0.moveClientY = this0.p3_oev.clientY;
            doc.onmousemove = function (ev) {
                this0.p3_oev0 = ev || window.event;
                this0.moveClientX0 = this0.p3_oev0.clientX - this0.moveClientX;
                this0.moveClientY0 = this0.p3_oev0.clientY - this0.moveClientY;
                this0.moveClientX = this0.p3_oev0.clientX;
                this0.moveClientY = this0.p3_oev0.clientY;
                this0.drag3d(this0.downClientX,this0.downClientY,this0.moveClientX,this0.moveClientY);
            };
            doc.onmouseup = function () {
                this0.p3_kasaX = this0.p3_kasaX + this0.p3_rotateX;
                this0.p3_kasaY = this0.p3_kasaY + this0.p3_rotateY;
                doc.onmousemove = null;
                this0.up();
            };
            return false;
        };
        this.p3_img_close.onclick = function () {
            this0.p3_butai.style.display = 'none';
        };
        //
        this.title_text = getId(doc,'title_text').children[0];
        this.create_button = getId(doc,'tsukuru');
        this.create_button.onclick = function () {
            new creat({
                "h" : this0.ziding[0].children[0].value,
                "w" : this0.ziding[1].children[0].value,
                "l" : this0.ziding[2].children[0].value,
                "t" : this0.ziding[3].children[0].value,
                "text" : this0.title_text.value,
                "tuozhuai" : this0.arrCheck[0].checked,
                "daxiao" : this0.arrCheck[1].checked,
                "zhezhao" : this0.arrCheck[2].checked,
                "X" : this0.arrCheck[3].checked,
                "Y" : this0.arrCheck[4].checked,
                "Z" : this0.arrCheck[5].checked
            }).window();
        };
        //注意：编写顺序错误导致的...
    },
    "canvas_p4": function () {
        var this0 = this;
        this.cantime = this.adiv3d[4].children[0];
        this.canzu = this.adiv3d[4].children[1];
        //page4定位
        this.can0 = this.cantime.children[0];
        this.div0 = this.cantime.children[1];
        this.can1 = this.canzu.children[0];
        this.can1inp = this.canzu.children[1];
        this.can1but = this.canzu.children[2];
        //父级
        this.cantime.style.cssText = 'width:' + clientH * 0.8 + 'px; height:' + clientH * 0.3 + 'px; margin-top:' + clientH * 0.1 + 'px';
        this.canzu.style.cssText = 'width:' + clientH * 0.8 + 'px; height:' + clientH * 0.5 + 'px; left:' + clientH * 0.1 + 'px; top:' + clientH * 0.4 + 'px;';
        //子级
        this.can0.width = clientH * 0.25;
        this.can0.height = clientH * 0.25;
        this.div0.style.width = this.cantime.clientWidth - clientH * 0.3 + 'px';
        this.div0.style.height = this.cantime.clientHeight + 'px';
        //浮动误差消除不能
        this.div0.children[0].style.lineHeight = this.div0.children[0].clientHeight + 'px';
        this.div0.children[0].style.fontSize = this.div0.children[0].clientHeight * 0.8 + 'px';
        this.div0.children[1].style.lineHeight = this.div0.children[1].clientHeight + 'px';
        this.div0.children[1].style.fontSize = this.div0.children[1].clientHeight * 0.5 + 'px';
        //
        this.can1.width = clientH * 0.8;
        this.can1.height = clientH * 0.4;
        //
        this.can1inp.style.cssText = 'width:' + (clientH * 0.6 - getsty(this.can1inp, 'borderLeftWidth') * 2) + 'px;height:' + (clientH * 0.1 - getsty(this.can1inp, 'borderLeftWidth') * 2) + 'px; ' +
            'left:' + clientH * 0.025 + 'px; top:' + clientH * 0.37 + 'px;';
        this.can1but.style.cssText = 'width:' + clientH * 0.12 + 'px; height:' + clientH * 0.08 + 'px; left:' + clientH * 0.65 + 'px; top:' + clientH * 0.38 + 'px;';
        this.can1but.style.lineHeight = this.can1but.clientHeight + 'px';
        this.can1but.style.fontSize = this.can1but.clientHeight * 0.25 + 'px';
        //绘制
        this.x = this.can0.width / 2;//正方形就...
        this.ocg0 = this.can0.getContext('2d');
        //
        this.yy = this.can1.height;
        this.xx = this.can1.width;
        this.realyy = this.yy * 0.15;
        this.realxx = this.xx * 0.15;
        this.shinrealyy = this.yy - this.yy * 0.15;
        this.shinrealxx = this.xx - this.xx * 0.15;
        this.x12 = this.shinrealxx / 12;
        this.y4 = this.shinrealyy / 4;
        //
        this.runtime();
        this.rundate();
        clearInterval(this.timeClock);
        clearInterval(this.timeday);
        this.timeClock = setInterval(function () {
            this0.runtime();
        }, 1000);
        this.timeday = setInterval(function () {
            this0.rundate();
        }, 86400000);
        this.tubiao();
        //
        this.can1but.onclick = function () {
            this0.reg0 = /[^\d| ]/;
            if (this0.reg0.test(this0.can1inp.value)) {
                alert('格式错误');
            }
            else {
                clearInterval(this0.timetubiao);
                this0.aInpval = this0.can1inp.value.split(' ');
                this0.aInpvalmax = zuida(this0.aInpval);
                this0.aInpvalwei = this0.aInpvalmax.toString().length;
                this0.max = su0(this0.aInpvalwei) * ( parseInt(this0.aInpvalmax / su0(this0.aInpvalwei)) + 1 );
                this0.max100 = this0.shinrealyy * 0.95 / this0.max;
                //
                this0.newArr = [];
                this0.aOnOff = [];
                this0.fontmax = [];
                for (var i = 0; i < this0.aInpval.length; i++) {
                    this0.newArr.push(0);
                    this0.aOnOff.push(0);
                }
                //
                this0.timetubiao = setInterval(function () {
                    this0.tubiao();
                    this0.tubiao0();
                }, 20);
            }
        }
    },
    "about_p5" : function () {
        var this0 = this;
        this.p5img = this.adiv3d[5].children[0];
        this.p5img.className = 'p5class';
        new p3win(this.p5img,0);
        this.p5creat = new creat({
            "h" : clientH,
            "w" : clientW,
            "l" : 0,
            "t" : 0,
            "color" : 'black',
            "about" : '作者：张昀琦；联系电话：15102236470'
        });
        this.p5img.ondblclick = function () {
            this0.p5creat.window();
        };
        this.p5creat.creatWindow.onclick = function (ev) {
            this0.oevgame = ev||window.event;
            this0.p5game_X = this0.oevgame.clientX;
            this0.p5game_Y = this0.oevgame.clientY;
            this0.aboutGame();
            return false;
        };
        this.p5creat.creatWindow.onmousedown = function () {
            return false;
        }
    },
    "runtime": function () {
        //时间
        this.timeDate = new Date();
        this.shi = this.timeDate.getHours();
        this.fen = this.timeDate.getMinutes();
        this.miao = this.timeDate.getSeconds();
        this.week = this.timeDate.getDay();
        this.day = this.timeDate.getDate();
        this.month = this.timeDate.getMonth() + 1;
        this.year = this.timeDate.getFullYear();
        this.canMiao = this.miao * 6 - 90;
        this.canFen = (this.canMiao / 60) + (this.fen * 6 - 90);
        this.canShi = (this.fen * 6 - 90) / 12 + (this.shi * 30 - 90);
        //秒刻度
        this.ocg0.save();
        this.ocg0.translate(this.x, this.x);
        this.ocg0.clearRect(-this.x, -this.x, clientH * 0.3, clientH * 0.3);
        this.ocg0.beginPath();
        this.ocg0.strokeStyle = 'white';
        this.ocg0.lineWidth = 1;
        for (var i = 0; i < 60; i++) {
            this.ocg0.rotate(6 * Math.PI / 180);
            this.ocg0.moveTo(this.x * 0.7, 0);
            this.ocg0.lineTo(this.x * 0.75, 0);
        }
        this.ocg0.stroke();
        this.ocg0.closePath();
        //5秒刻度
        this.ocg0.beginPath();
        this.ocg0.lineWidth = 2;
        for (var i = 0; i < 12; i++) {
            this.ocg0.rotate(30 * Math.PI / 180);
            this.ocg0.moveTo(this.x * 0.6, 0);
            this.ocg0.lineTo(this.x * 0.75, 0);
        }
        this.ocg0.stroke();
        this.ocg0.closePath();
        //同心圆
        this.ocg0.beginPath();
        this.ocg0.lineWidth = 2;
        this.ocg0.arc(0, 0, this.x * 0.85, 0, 2 * Math.PI, false);
        this.ocg0.stroke();
        this.ocg0.closePath();
        this.ocg0.beginPath();
        this.ocg0.lineWidth = 2;
        this.ocg0.arc(0, 0, this.x * 0.9, 0, 2 * Math.PI, false);
        this.ocg0.stroke();
        this.ocg0.closePath();
        this.ocg0.restore();
        //秒针
        this.ocg0.beginPath();
        this.ocg0.strokeStyle = 'white';
        this.ocg0.lineWidth = 1;
        this.ocg0.moveTo(this.x, this.x);
        this.ocg0.arc(this.x, this.x, this.x * 0.65, this.canMiao * Math.PI / 180, this.canMiao * Math.PI / 180, false);
        this.ocg0.stroke();
        this.ocg0.closePath();
        //分针
        this.ocg0.beginPath();
        this.ocg0.lineWidth = 3;
        this.ocg0.moveTo(this.x, this.x);
        this.ocg0.arc(this.x, this.x, this.x * 0.5, this.canFen * Math.PI / 180, this.canFen * Math.PI / 180, false);
        this.ocg0.stroke();
        this.ocg0.closePath();
        //时针
        this.ocg0.beginPath();
        this.ocg0.lineWidth = 5;
        this.ocg0.moveTo(this.x, this.x);
        this.ocg0.arc(this.x, this.x, this.x * 0.35, this.canShi * Math.PI / 180, this.canShi * Math.PI / 180, false);
        this.ocg0.stroke();
        this.ocg0.closePath();
        //
        this.div0.children[0].innerHTML = add0(this.shi) + ':' + add0(this.fen);
    },
    "rundate": function () {
        switch (this.week) {
            case 0:
                this.realweek = '星期日';
                break;
            case 1:
                this.realweek = '星期一';
                break;
            case 2:
                this.realweek = '星期二';
                break;
            case 3:
                this.realweek = '星期三';
                break;
            case 4:
                this.realweek = '星期四';
                break;
            case 5:
                this.realweek = '星期五';
                break;
            case 6:
                this.realweek = '星期六';
                break;
        }
        this.div0.children[1].innerHTML = this.year + '年' + this.month + '月' + this.day + '日 ' + this.realweek;
    },
    "tubiao": function () {
        this.ocg1 = this.can1.getContext('2d');
        this.ocg1.clearRect(0, 0, this.xx, this.yy);
        this.ocg1.save();
        this.ocg1.translate(0, this.yy);
        //
        this.ocg1.beginPath();
        this.ocg1.strokeStyle = 'white';
        this.ocg1.lineWidth = 3;
        this.ocg1.moveTo(this.realxx, -this.realyy);
        this.ocg1.lineTo(this.realxx, -this.yy);
        this.ocg1.moveTo(this.realxx, -this.realyy);
        this.ocg1.lineTo(this.xx, -this.realyy);
        this.ocg1.stroke();
        this.ocg1.closePath();
        this.ocg1.restore();
        //
        this.ocg1.save();
        this.ocg1.translate(this.realxx, this.shinrealyy);
        this.ocg1.beginPath();
        this.ocg1.strokeStyle = 'white';
        this.ocg1.lineWidth = 1;
        for (var i = 1; i < 4; i++) {
            this.ocg1.moveTo(0, -this.shinrealyy * 0.95 * i * 0.25);
            this.ocg1.lineTo(this.xx, -this.shinrealyy * 0.95 * i * 0.25);
            this.ocg1.moveTo(this.shinrealxx * i * 0.25, 0);
            this.ocg1.lineTo(this.shinrealxx * i * 0.25, -this.yy);
        }
        this.ocg1.stroke();
        this.ocg1.closePath();
        this.ocg1.restore();
    },
    "tubiao0": function () {
        this.ocg1.save();
        this.ocg1.translate(this.realxx, this.shinrealyy);
        this.ocg1.beginPath();
        this.ocg1.fillStyle = 'white';
        //数值字体
        this.ocg1.font = '' + this.x12 * 0.5 + 'px Arial';
        for (var i = 1; i < 5; i++) {
            this.txtWidth = this.ocg1.measureText('' + this.max / 4 * i + '').width + (this.x12 * 0.2);
            this.ocg1.fillText('' + this.max / 4 * i + '', -this.txtWidth, -( (i * this.y4) - this.x12 * 0.5));
        }
        for (var i = 0; i < 12; i++) {
            if (this.newArr[i] >= parseInt(Number(this.aInpval[i]) * this.max100)) {
                this.aOnOff[i] = 1;
                this.newArr[i] = parseInt(Number(this.aInpval[i]) * this.max100);
                this.fontmax[i] = Number(this.aInpval[i]);
            }
            else {
                this.newArr[i] += 2;
                this.fontmax[i] = parseInt(this.newArr[i] / this.max100);
            }
            // 数值字体
            this.ocg1.font = '' + this.x12 * 0.3 + 'px Arial';
            this.ocg1.fillText('' + this.fontmax[i] + '', (i + 1) * this.x12 * 0.25 + i * this.x12 * 0.74, -this.newArr[i]);
            // 月份字体
            this.ocg1.font = '' + this.x12 * 0.35 + 'px Arial';
            this.ocg1.fillText('' + (i + 1) + '月', (i + 1) * this.x12 * 0.25 + i * this.x12 * 0.75, this.x12 * 0.4);
            //
            this.ocg1.moveTo((i + 1) * this.x12 * 0.25 + i * this.x12 * 0.75, 0);
            this.ocg1.lineTo((i + 1) * this.x12 * 0.25 + i * this.x12 * 0.75, -this.newArr[i]);
            this.ocg1.lineTo((i + 1) * this.x12, -this.newArr[i]);
            this.ocg1.lineTo((i + 1) * this.x12, 0);
        }
        if (this.aOnOff.indexOf(0) == -1) {
            clearInterval(this.timetubiao);
        }
        this.ocg1.closePath();
        this.ocg1.fill();
        this.ocg1.restore();
    },
    "modoru": function () {
        for (var i = 0; i < 3; i++) {
            this.p3elements[i].style.left = clientH * 0.1 + 'px';
            this.p3elements[i].style.top = (i + 1) * clientH * 0.05 + this.p3elements[0].offsetHeight * i + 'px';
        }
    },
    "change": function () {
        this.parentNode.children[2].innerHTML = '' + this.value + '';
    },
    "p3_3dimg": function () {
        for (var i=0; i<this.p3_img.length; i++)
        {
            this.p3_img[i].style.width = clientH*0.4 +'px';
            this.p3_img[i].style.height = clientH*0.4*0.7 +'px';
            this.p3_img[i].style.left = (this.p3_fat.clientWidth - this.p3_img[0].offsetWidth)/2+'px';
            this.p3_img[i].style.top = (this.p3_fat.clientHeight - this.p3_img[0].offsetHeight)/2+'px';
            this.p3_img[i].style.transform = 'rotateY('+0+'deg) translateZ('+0+'px)';
        }
        this.tarnsZ = (this.p3_img[0].offsetWidth/2)/Math.tan(30*Math.PI/180)*2*1.2;
        this.p3_fat.style.transformStyle = 'preserve-3d';
        this.p3_fat.style.transform = 'rotateX('+ -10 +'deg)';
        this.p3_butai.style.perspective = this.tarnsZ*4 + 'px';
    },
    "p3_3dimgKai": function () {
        var this0 = this;
        this.p3_numZ = 0;
        this.p3_numXY = 0;
        this.p3_3dimg_timer = setInterval(function () {
            this0.p3_initTime();
        },30);
    },
    "p3_initTime": function () {
        this.p3_numZ = this.p3_numZ + 5;
        this.p3_numXY = this.p3_numXY + 10;
        if (this.p3_numZ > this.tarnsZ && this.p3_numXY > 360)
        {
            clearInterval(this.p3_3dimg_timer);
        }
        for (var i = 0; i<this.p3_img.length; i++)
        {
            if (this.p3_numZ >= this.tarnsZ)
            {
                this.p3_numZ = this.tarnsZ
            }
            if (this.p3_numXY >= i*30)
            {
                this.p3_img[i].style.transform = 'rotateY('+i*30+'deg) translateZ('+this.p3_numZ+'px)';
            }
        }
        this.p3_fat.style.transform = 'rotateX('+ -10 +'deg) rotateY('+this.p3_numXY+'deg)';
    },
    "drag3d": function (dx,dy,mx,my) {
        this.p3_rotateX = (dx - mx)*0.3;
        this.p3_rotateY = (dy - my)*0.2;
        this.p3_dragXXX = this.p3_numXY +this.p3_kasaX + this.p3_rotateX;
        this.p3_dragYYY = -10 + this.p3_kasaY + this.p3_rotateY;
        this.p3_fat.style.transform = 'rotateX('+(this.p3_dragYYY - this.moveClientYre)+'deg) rotateY('+(this.p3_dragXXX - this.moveClientXre)+'deg)';
    },
    "up": function () {
        var this0 = this;
        this.up_timer = setInterval(function () {
            this0.up_timeFn();
        },30)
    },
    "up_timeFn": function () {
        this.moveClientX0*=0.95;
        this.moveClientY0*=0.85;
        this.moveClientYre = this.moveClientYre + this.moveClientY0;
        this.moveClientXre = this.moveClientXre + this.moveClientX0;
        if ( Math.abs(this.moveClientX0)<1 && Math.abs(this.moveClientY0)<1 )
        {
            clearInterval(this.up_timer);
            doc.onmouseup = null;
        }
        this.p3_fat.style.transform = 'rotateX('+(this.p3_dragYYY - this.moveClientYre)+'deg) rotateY('+(this.p3_dragXXX - this.moveClientXre)+'deg)';
    },
    "aboutGame" : function () {
        var this0 = this;
        this.game_main = doc.createElement('div');
        this.game_main.style.cssText = 'height:30px; width:5px; left:'+this0.p5game_X+'px; top:'+ clientH +'px; position: absolute; background-color:yellow;';
        this.p5creat.creatWindow.appendChild(this.game_main);
        new game(this.game_main,this.p5creat.creatWindow,this.p5game_X,this.p5game_Y);
    },
    "playdrag" : function (obj,objfat,media) {
        obj.onmousedown = function (ev) {
            obj.ev = ev || window.event;
            obj.X = obj.ev.clientX - obj.offsetLeft;
            document.onmousemove = function (ev) {
                obj.ev0 = ev || window.event;
                obj.X0 = obj.ev0.clientX - obj.X;
                if (obj.X0 < 0)
                {
                    obj.X0 = 0;
                }
                else if (obj.X0 > objfat.clientWidth - obj.offsetWidth)
                {
                    obj.X0 = objfat.clientWidth - obj.offsetWidth;
                }
                if(media)
                {
                    media.volume = obj.X0/(objfat.clientWidth - obj.offsetWidth);
                }
                obj.style.left = obj.X0 + 'px';
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        };
        return false;
    },
    "playerTTT" : function () {
        if(this.player.ended)
        {
            clearInterval(this.player_timer);
            this.p5_playMoveBeilv = 1;
            this.p5_playMove.style.width = this.p5_playMoveBeilv*this.p5_playMoveFat.offsetWidth + 'px';
            this.playTimeC.children[0].innerHTML = this.playTimeAllH + this.playTimeAllM + ':' + this.playTimeAllS;
            this.con.style.bottom = 0;
            this.con.style.cursor = 'default';
        }
        else if (this.player.paused)
        {
            clearInterval(this.player_timer);
            this.con.style.bottom = 0;
            this.con.style.cursor = 'default';
        }
        else
        {
            this.playTime = this.player.currentTime;
            if (this.playTime/360 >= 1)
            {
                this.playTimeH = parseInt(this.playTime/360)+':';
            }
            else {
                this.playTimeH = '';
            }
            this.playTimeM = parseInt(this.playTime%360/60);
            if (this.playTime%360%60 < 10)
            {
                this.playTimeS = '0'+ parseInt(this.playTime%360%60);
            }
            else
            {
                this.playTimeS = parseInt(this.playTime%360%60);
            }
            this.playTimeC.children[0].innerHTML = this.playTimeH + this.playTimeM + ':' + this.playTimeS;
            this.p5_playMoveBeilv = this.playTime/this.playTimeAll;
            this.p5_playMove.style.width = this.p5_playMoveBeilv*this.p5_playMoveFat.offsetWidth + 'px';
            //html5误差有
        }
    },
    "playerBenRi" : function () {
        var this0 = this;
        this.player.onmousemove = function () {
            clearTimeout(this0.timetimetime);
            if (!this0.player.paused)
            {
                this0.con.style.bottom = '0';
                this0.fat_play.style.cursor = 'default';
                this0.timetimetime = setTimeout(function () {
                    this0.con.style.bottom = '-15%';
                    this0.fat_play.style.cursor = 'none';
                }, 500)
            }
        };
        this.con.onmouseover = function () {
            clearTimeout(this0.timetimetime);
        };
    },
    "fullhalf": function () {
        if (!this.p5_full_hd)
        {
            this.p5_full.style.background = 'url("./img/e2.png") no-repeat center';
            this.p5_full.style.backgroundSize = 'contain';
            if (this.fat_play.requestFullscreen) {
                this.fat_play.requestFullscreen();
            }
            else if (this.fat_play.webkitRequestFullscreen) {
                this.fat_play.webkitRequestFullscreen();
            }
            else if (this.fat_play.mozRequestFullScreen) {
                this.fat_play.mozRequestFullScreen();
            }
            if (window.navigator.userAgent.indexOf("Chrome") != -1)
            {
                this.fat_play.style.cssText = 'width: 100%; height: 100%; position: absolute; left: 0%; top: 0%;';
            }
        }
        else
        {
            if (window.navigator.userAgent.indexOf("Chrome") != -1)
            {
                this.fat_play.style.cssText = 'width: 120%; height: 80%; position: absolute; left: -10%; top: 10%;';
            }
            this.p5_full.style.background = 'url("./img/e1.png") no-repeat center';
            this.p5_full.style.backgroundSize = 'contain';
            if (document.exitFullscreen)
            {
                document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen();
            }
            else if (document.mozCancelFullScreen)
            {
                document.mozCancelFullScreen();
            }
        }
    },
    "playTimeDura" : function () {
        this.playTimeAll = this.player.duration;
        if (this.playTimeAll/360 >= 1)
        {
            this.playTimeAllH = parseInt(this.playTimeAll/360)+':';
        }
        else {
            this.playTimeAllH = '';
        }
        this.playTimeAllM = parseInt(this.player.duration%360/60);
        if (this.player.duration%360%60 < 10)
        {
            this.playTimeAllS = '0'+parseInt(this.player.duration%360%60);
        }
        else {
            this.playTimeAllS = parseInt(this.player.duration%360%60);
        }
        this.playTimeC.children[1].innerHTML = '/'+ this.playTimeAllH + this.playTimeAllM + ':' + this.playTimeAllS;
    },
    "playLoad" : function (index) {
        var this0 = this;
        this.p5_playMove.style.width = 0;
        this.p5_play.style.background = 'url("./img/p2.png") no-repeat center';
        this.p5_play.style.backgroundSize = 'contain';
        this.player.src = mSrc[index];
        this.player.load();
        this.player.play();
        this.player.oncanplay = function ()
        {

            this0.playTimeDura();//hannoujikan
            this0.player_timer = setInterval(function () {
                this0.playerTTT();
            },1000);
        };
    }
};
function p3win(obj,posX) {//特殊拖拽
    this.div = obj;
    this.posX = posX;
    this.init();
}
p3win.prototype = {
    "init" : function () {
        var this0 = this;
        this.div.onmousedown = function (ev) {
            this0.oev = ev|| window.event;
            this0.ClientX = ev.clientX - this0.div.offsetLeft - this0.posX;
            this0.ClientY = ev.clientY - this0.div.offsetTop;
            this0.down(this0.oev);
            return false;
        }
    },
    "down" : function (ev) {
        var this0 = this;
        doc.onmousemove = function (ev) {
            this0.oev = ev|| window.event;
            this0.move(this0.oev);
        };
        doc.onmouseup = function () {
            this0.up();
        }
    },
    "move" : function (ev) {
        this.areaX = ev.clientX - this.posX - this.ClientX;
        this.areaY = ev.clientY - this.ClientY;
        if ( this.areaX <= 0 )
        {
            this.areaX = 0;
        }
        else if ( this.areaX >= clientH - this.div.offsetWidth )
        {
            this.areaX = clientH - this.div.offsetWidth ;
        }
        if ( this.areaY <= 0 )
        {
            this.areaY = 0;
        }
        else if ( this.areaY >= clientH - this.div.offsetHeight )
        {
            this.areaY = clientH - this.div.offsetHeight ;
        }
        this.div.style.left = this.areaX + 'px';
        this.div.style.top =  this.areaY + 'px';
    },
    "up" : function () {
        doc.onmousemove = null;
        doc.onmouseup= null;
    }
};
function creat(opt) {
    this.set = {
        "h" : 0,
        "w" : 0,
        "l" : 0,
        "t" : 0,
        "text" : false,
        "color" : 'white',
        "tuozhuai" : false,
        "daxiao" : false,
        "zhezhao" : false,
        "X" : false,
        "Y" : false,
        "Z" : false
    };
    copy(opt,this.set);
    this.creatWindow = doc.createElement('div');
}
creat.prototype.window = function () {
    var this0 = this;
    //
    this.creatWindow.style.cssText = 'height:'+this.set.h+'px; width:'+this.set.w+'px; left:'+this.set.l+'px; top:'+this.set.t+'px; position: absolute; font-size: 1em;';
    this.creatWindow.className = 'creat';
    this.creatWindow.style.backgroundColor = ''+this.set.color+'';
    if (this.set.about)
    {
        this.creatWindow.style.textAlign = 'center';
        this.creatWindow.style.lineHeight = this.set.h + 'px';
        this.creatWindow.style.fontSize ='4em';
        this.creatWindow.innerHTML = this.set.about;
    }
    if (this.set.text)
    {
        this.creatWindowTitle = doc.createElement('div');
        this.creatWindowTitle.innerHTML = ''+this.set.text+'';
        this.creatWindowTitle.className = 'creat_tite';
    }

    this.creatWindowClose = doc.createElement('div');
    this.creatWindowClose.innerHTML = 'X';
    this.creatWindowClose.className = 'creat_close';
    if (this.set.zhezhao)
    {
        this.creatWindowMask = doc.createElement('div');
        this.creatWindowMask.style.cssText = 'height:'+clientH+'px; width:'+clientW+'px; background-color: rgba(0,0,0,0.5)';
        doc.body.appendChild(this.creatWindowMask);
    }
    this.creatWindow.appendChild(this.creatWindowClose);
    if (this.set.text)
    {
        this.creatWindow.appendChild(this.creatWindowTitle);
    }
    doc.body.appendChild(this.creatWindow);
    //
    this.creatWindowClose.onclick = function () {
        clearInterval(this0.timer);//不遗留定时器
        if (this0.set.zhezhao)
        {
            doc.body.removeChild(this0.creatWindowMask);
        }
        doc.body.removeChild(this0.creatWindow);
    };
    if (this.set.daxiao)
    {
        this.creatWindow.onmousedown = function (ev) {
            this0.width_kai = this0.creatWindow.clientWidth;
            this0.left_kai = this0.creatWindow.offsetLeft;
            this0.top_kai = this0.creatWindow.offsetTop;
            this0.height_kai = this0.creatWindow.clientHeight;
            //
            this0.oev = ev || window.event;
            this0.disX = this0.oev.clientX - this0.creatWindow.offsetLeft;
            this0.disY = this0.oev.clientY - this0.creatWindow.offsetTop;
            //
            if(this0.oev.clientX > this0.creatWindow.offsetLeft && this0.oev.clientX < this0.creatWindow.offsetLeft+10)
            {
                doc.onmousemove = function (ev) {
                    this0.oev1 = ev || window.event;
                    this0.move0(this0.oev,this0.oev1,this0.width_kai,this0.left_kai);
                };
                doc.onmouseup = function () {
                    this0.up();
                };
            }
            else if(this0.oev.clientX < this0.creatWindow.offsetLeft + this0.creatWindow.offsetWidth && this0.oev.clientX > this0.creatWindow.offsetLeft + this0.creatWindow.offsetWidth - 10)
            {
                doc.onmousemove = function (ev) {
                    this0.oev1 = ev || window.event;
                    this0.move1(this0.oev,this0.oev1,this0.width_kai,this0.left_kai);
                };
                doc.onmouseup = function () {
                    this0.up();
                };
            }
            else if(this0.oev.clientY > this0.creatWindow.offsetTop && this0.oev.clientY < this0.creatWindow.offsetTop + 10)
            {
                doc.onmousemove = function (ev) {
                    this0.oev1 = ev || window.event;
                    this0.move2(this0.oev,this0.oev1,this0.height_kai,this0.top_kai);
                };
                doc.onmouseup = function () {
                    this0.up();
                };
            }
            else if(this0.oev.clientY < this0.creatWindow.offsetTop + this0.creatWindow.offsetHeight && this0.oev.clientY > this0.creatWindow.offsetTop + this0.creatWindow.offsetHeight - 10)
            {
                doc.onmousemove = function (ev) {
                    this0.oev1 = ev || window.event;
                    this0.move3(this0.oev,this0.oev1,this0.height_kai);
                };
                doc.onmouseup = function () {
                    this0.up();
                };
            }
            else if (this0.set.tuozhuai)
            {
                doc.onmousemove = function (ev) {
                    this0.oev1 = ev || window.event;
                    this0.move4(this0.oev1);
                };
                doc.onmouseup = function () {
                    this0.up();
                };
            }
            return false;
        }
    }
    if (this.set.tuozhuai && !this.set.daxiao )
    {
        this.creatWindow.onmousedown = function (ev) {
            this0.oev = ev || window.event;
            this0.disX = this0.oev.clientX - this0.creatWindow.offsetLeft;
            this0.disY = this0.oev.clientY - this0.creatWindow.offsetTop;
            doc.onmousemove = function (ev) {
                this0.oev1 = ev || window.event;
                this0.move4(this0.oev1);
            };
            doc.onmouseup = function () {
                this0.up();
            };
        }
    }
    this.num = 0;
    this.timer = setInterval(function () {
        this0.mawaru();
    },10)
};
creat.prototype.move0 = function (ev1,ev2,w,l) {
    doc.body.style.cursor = 'e-resize';
    this.ev_kai = ev2.clientX - ev1.clientX;
    if (this.ev_kai > w-100)
    {
        this.ev_kai = w-100;
    }
    this.creatWindow.style.left = l + this.ev_kai + 'px';
    this.creatWindow.style.width = w - this.ev_kai + 'px';//注意边框误差clientWidth必须
};
creat.prototype.move1 = function (ev1,ev2,w) {
    doc.body.style.cursor = 'e-resize';
    this.ev_kai = ev2.clientX - ev1.clientX;
    if (this.ev_kai < -(w-100))
    {
        this.ev_kai = -(w-100);
    }
    this.creatWindow.style.width = w + this.ev_kai + 'px';//注意边框误差clientWidth必须
};
creat.prototype.move2 = function (ev1,ev2,h,t) {
    doc.body.style.cursor = 'n-resize';
    this.ev_kai = ev2.clientY - ev1.clientY;
    if (this.ev_kai > h-100)
    {
        this.ev_kai = h-100;
    }
    this.creatWindow.style.top = t + this.ev_kai + 'px';
    this.creatWindow.style.height = h - this.ev_kai + 'px';//注意边框误差clientWidth必须
};
creat.prototype.move3 = function (ev1,ev2,h) {
    doc.body.style.cursor = 'n-resize';
    this.ev_kai = ev2.clientY - ev1.clientY;
    if (this.ev_kai < -(h-100) )
    {
        this.ev_kai = -(h-100);
    }
    this.creatWindow.style.height = h + this.ev_kai + 'px';//注意边框误差clientWidth必须
};
creat.prototype.move4 = function (oev) {
    doc.body.style.cursor = 'move';
    this.creatWindow.style.left = oev.clientX - this.disX + 'px';
    this.creatWindow.style.top = oev.clientY - this.disY + 'px';
};
creat.prototype.up = function () {
    doc.body.style.cursor = 'Default';
    doc.onmousemove = null;
    doc.onmouseup = null;
};
creat.prototype.mawaru = function () {
    if (this.set.X && !this.set.Y && !this.set.Z)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateX('+this.num+'deg)';
        }
    }
    else if ( !this.set.X && this.set.Y && !this.set.Z)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateY('+this.num+'deg)';
        }
    }
    else if ( !this.set.X && !this.set.Y && this.set.Z)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateZ('+this.num+'deg)';
        }
    }
    else if ( this.set.X && this.set.Y && !this.set.Z)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateX('+this.num+'deg) rotateY('+this.num+'deg)';
        }
    }
    else if ( this.set.X && this.set.Z && !this.set.Y)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateX('+this.num+'deg) rotateZ('+this.num+'deg)';
        }
    }
    else if ( this.set.Y && this.set.Z && !this.set.X)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateY('+this.num+'deg) rotateZ('+this.num+'deg)';
        }
    }
    else if ( this.set.Y && this.set.X && this.set.Z)
    {
        this.num = this.num + 4;
        if (this.num > 360)
        {
            clearInterval(this.timer);
        }
        else
        {
            this.creatWindow.style.transform = 'rotateX('+this.num+'deg) rotateY('+this.num+'deg) rotateZ('+this.num+'deg)';
        }
    }
};
function game(obj,fat,x,y) {
    var this0 = this;
    this.gDiv = obj;
    this.fat = fat;
    this.X = x;
    this.Y = y;
    this.timer = setInterval(function () {
        this0.run();
    }
    ,20);
}
game.prototype.run = function () {
    var this0 = this;
    if (this.gDiv.offsetTop < this.Y)
    {
        clearInterval(this.timer);
        this.fat.removeChild(this.gDiv);
        this.div = [];
        this.numBack = 0;
        for (var i=0; i<100; i++)
        {
            this.div[i] = doc.createElement('div');
            this.div[i].style.cssText = 'height:5px; width:5px; left:'+this.X+'px; top:'+ this.Y +'px; position: absolute;';
            this.div[i].sokudoX = parseInt(Math.random()*40-20);
            this.div[i].sokudoY = parseInt(Math.random()*40-20);
            this.fat.appendChild(this.div[i]);
        }
        this.timer0 = setInterval(function () {
            this0.runko();
        },20);
        this.timer1 = setInterval(function () {
            this0.back();
        },100)
    }
    this.gDiv.style.top = this.gDiv.offsetTop - 10 + 'px';
};
game.prototype.runko = function () {
    this.num = 0;
    for (var i=0; i<this.div.length; i++)
    {
        if ( this.div[i].offsetTop > clientH  || this.div[i].offsetLeft < 0 || this.div[i].offsetLeft > clientW )
        {
            this.fat.removeChild(this.div[i]);
        }
        this.div[i].style.backgroundColor = '#'+this.color()+'';
        this.div[i].style.left = this.div[i].offsetLeft + this.div[i].sokudoX + 'px';
        this.div[i].style.top = this.div[i].offsetTop + this.div[i].sokudoY + 'px';
        this.div[i].sokudoY++;
        this.num++;
    }
    if (!this.num)
    {
        clearInterval(this.timer0);
        this.div = null;
    }
};
game.prototype.back = function () {
    this.numBack++;
    if(this.numBack>7)
    {
        clearInterval(this.timer1); //定时器和清除定时器为非阻塞模式
    }
    this.numBack%2?this.fat.style.backgroundColor = '#CCC':this.fat.style.backgroundColor = 'black';
};
game.prototype.color = function () {
    return this.iro = ( '00000'+ (parseInt( Math.random()*16777215).toString(16)) ).slice(-6);
};
