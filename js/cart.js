/**
 * Created by 肖潇 on 2016/8/15.
 */

window.onload = function(){
  checkBox();
  delBox();
}
//复选框
var checkBox = function(){
  var checkBoxList = $(".jd_check_box");
  console.log(checkBoxList);
  for(var i=0;i<checkBoxList.length;i++){
    checkBoxList[i].onclick = function(){
      var hasChecked = this.getAttribute('checked');
      if(hasChecked!=null){
        this.removeAttribute('checked');
      }else {
        this.setAttribute('checked','');
      }
    }
  }
}
//删除
var delBox = function(){
  var delBox = $(".delete_box");
  console.log(delBox);
  var win  = $(".jd_win")[0];
  var winBox = $(".jd_win_box")[0];
  var up;
  for(var i=0;i<delBox.length;i++){
    delBox[i].onclick = function(){
      win.style.display = "block";
      winBox.className = "jd_win_box jumpOut";
      var deleteObj = this;
      up = deleteObj.getElementsByClassName("delete_box_top")[0];
      up.style.transition = "all 1s ease";
      up.style.webkitTransition = "all 1s ease";
      up.style.transform = "translateY(-5px) translateX(-2px) rotate(-45deg)";
      up.style.webkitTransform = "translateY(-5px) translateX(-2px) rotate(-45deg)";
    }
  }
  $(".no")[0].onclick = function(){
    console.log(0);
    win.style.display = "none";
    winBox.className = "jd_win_box";
    if(up){
      up.style.transform = "translateY(0) translateX(0) rotate(0)";
      up.style.webkitTransform = "translateY(0) translateX(0) rotate(0)";
    }
  }
  $(".ok")[0].onclick = function(){
    console.log(1);

  }
}
function $(sel){
  return document.querySelectorAll(sel);
}