/**
 * Created by Administrator on 2016/8/12.
 */
window.onload = function(){
  //导航条改变
  window.onscroll = function(){
    var bannerHeight = $(".jd_banner").offsetHeight;
    var top  = document.body.scrollTop;
    //rgba(201,21,35,0.85)
    if(top > bannerHeight){
      $('.jd_header_box').style.backgroundColor = "rgba(201,21,35,0.85)";
    }else {
      var c = top/bannerHeight * 0.85;

      $('.jd_header_box').style.backgroundColor = "rgba(201,21,35,"+c+")";
    }
  }
  //秒杀倒计时，假设7小时倒计时

  var t = 7 * 60 * 60 * 1000;
  var p = $(".sk_time");
  var s = p.getElementsByTagName("span");

  var timer = setInterval(function(){
    t-=1000;
    var second = Math.floor(t/1000%60);//计算出不能进化成分钟的秒数

    var minute = Math.floor(t/1000/60%60);//计算出不能进化成一个小时的分钟数
    var hour = Math.floor(t/1000/60/60%24);//计算出无法进化成一天的的小时数

    s[7].innerHTML = second < 10 ? second:second%10;
    s[6].innerHTML = second < 10 ? 0:parseInt(second/10);

    s[4].innerHTML = minute < 10 ? minute:minute%10;
    s[3].innerHTML = minute < 10 ? 0:parseInt(minute/10);

    s[1].innerHTML = hour < 10 ? hour:hour%10;
    s[0].innerHTML = hour < 10 ? 0:parseInt(hour/10);
    if(t <= 0){
      clearInterval(timer);
    }
  },1000);
  //首页轮播

  //图片所在的ul
  var banner = $(".jd_banner").getElementsByTagName("ul")[0];
  var bannerWidth = banner.offsetWidth;
  var width = bannerWidth*0.1;
  //圆点所在的ul
  var lis = $(".jd_banner").getElementsByTagName("ul")[1].getElementsByTagName("li");
  //记录图片的index
  var index = 1;
  var timer2 = setInterval(function(){

    index++;

    setTransition();
    setTransform(-index*width);
    liNow();
  },3000);
  //设置变换
  function setTransform(s){
    banner.style.transform = "translateX("+s+"px)";
    //banner.style.webkitTransform = "translateX("+s+"px)";

    console.log(index);
    //if(index == 0){
    //  lis[0].className = "now";
    //  document.getElementsByClassName("now")[0].className = "";
    //  return;
    //}
    //lis[index-1].className = "now";
  }
  //设置过度
  function setTransition(){
    banner.style.transition = "all .3s linear";
    banner.style.webkitTransition = "all .3s linear";

  }
  //取消过度
  function noTransition(){
    banner.style.transition = "none";
    banner.style.webkitTransition = "none";
  }
  banner.addEventListener('transitionend',transitionEnd,false);
  banner.addEventListener('webkitTransitionEnd',transitionEnd,false);
  banner.addEventListener('mozTransitionEnd',transitionEnd,false);
  function transitionEnd(){
    console.log("transitionend");
    if(index>=9){
      //当最后一张过度完成立即切换到最开始的放的多的那一张，完成无缝切换。
      index = 1;
      noTransition();
      setTransform(-index*width);
    }else if(index<=0){
      //触摸向右划到第一张，立即切换到最后哪一张，以保证可以无缝连接
      index = 8;
      noTransition();
      setTransform(-index*width);
    }

  }

  document.body.ontouchend = function(e){
    console.log(e.pageX);
  }

  //触摸轮播图事件

  var startPoint={},endPoint={},moveX=0;
  //绑定触摸事件
  banner.addEventListener("touchstart",startHandler,false);
  banner.addEventListener("touchmove",moveHandler,false);
  banner.addEventListener("touchend",endHandler,false);

  //start处理事件
  function startHandler(e){
    //记录开始位置
    startPoint = getPoint(e);


  }
  //mmove处理事件
  function moveHandler(e){
    //清除默认的计时器
    clearInterval(timer2);
    //清除默认的滚动事件
    e.preventDefault();
    //记录结束位置
    endPoint = getPoint(e);
    //计算触摸距离
    moveX = dis(endPoint,startPoint);

    //清除过渡
    noTransition();
    //移动
    setTransform(-index*width-moveX);
  }
  //end处理事件
  function endHandler(e){
    if(Math.abs(moveX)>(1/3*width) && endPoint.x !=0){
      if(moveX>0){
        //图片ul向左
        index++;

      }else if(moveX < 0){
        //向右
        index--
      }
      //设置过度
      setTransition();
      //改变位置
      setTransform(-index*width);
      //判断
      //transitionEnd();
      //因为transitionEnd();里面清楚了动画，这里再加上
      //setTransition();
      liNow();
    }else {
      //改变位置
      setTransform(-index*width);
      //设置过度
      setTransition();
    }
    //重新初始化变量
    startPoint = {};
    endPoint = {};
    //moveX = 0;

    //严格处理定时器
    clearInterval(timer2);
    timer2 = setInterval(function(){
      index++;
      liNow();
      setTransition();
      setTransform(-index*width);
    },3000)
  }
  function liNow() {
    //改index的任务给一个函数做！！给transitionEnd做就好了
    document.getElementsByClassName("now")[0].className = "";
    if(index>=9){
      lis[0].className = "now";
    }else if(index<=0){
      lis[7].className = "now";
    }else {
      lis[index-1].className = "now";
    }
  }
  //计算两点之间的距离
  function dis(p1,p2){
    return p2.x-p1.x;
  }
  //从事件对象获得点对象
  function getPoint(e) {
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;

    return {x:x,y:y};
  }
  function $(sel){
    return document.querySelector(sel);
  }
}