// width変更(AC,=ボタン)
$(document).ready( function() {
  $("#btn_ac,#btn_eq").css("width","245px");
})

let Last_str;
let target;
let old_str,add_str,new_str,tmp_str,tmp_VAL;
let keisu;
let shousu_str;
let tmp_cnt = 0 ;
let display_number = document.getElementById("show_number");

// 数値として認識できる場合のみ有効にする
function chk_str(old_str,add_str) {
  new_str = old_str + add_str;
  tmp_str = new_str.split(/\+|\-|\*|\//);
  for(i = 0; i < tmp_str.length; i++ ){
    if(isFinite(tmp_str[i]) == false) {
      new_str = old_str; 
      break;
    }
  }  
  return new_str;
}

function renketu(target) {
  if(display_number.innerHTML == "0") {
    if(target.innerHTML == "00") {
    
    } else if ((target.innerHTML).match('[\.+/\*]')) {
        display_number.innerHTML += target.innerHTML;
    } else {
        display_number.innerHTML = target.innerHTML;
    }
  } else {
    Last_str = (display_number.innerHTML).substr(-1);
    if(Last_str =="+" || Last_str =="-") {
      if((target.innerHTML).match('[^+-/\*]') && target.innerHTML != "00") {
        display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
      } else if (target.innerHTML == ".") {
        display_number.innerHTML = chk_str(display_number.innerHTML,"0.");
      }
    } else if (Last_str =="*" || Last_str =="/") {
      if((target.innerHTML).match('[^+/\*\.]') && target.innerHTML != "00") {
        display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
      } else if (target.innerHTML == ".") {
          display_number.innerHTML = chk_str(display_number.innerHTML,"0.");
      }
    } else if (Last_str == ".") {
      display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
    } else if (Last_str == "0") {
      tmp_str = (display_number.innerHTML).split(/\+|\-|\*|\//);
      tmp_VAL = (tmp_str[tmp_str.length - 1]);
      if(tmp_VAL.indexOf('[\.]') != -1 ) {
        display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
      } else {
        if (tmp_VAL.length != 1) {
          display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
        } else {
          if((target.innerHTML).match('[+-/\*\.]')) {
            display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
          }
        }
      }
    } else {
      display_number.innerHTML = chk_str(display_number.innerHTML,target.innerHTML);
    }
  }
}

function btn_input(target) {
  $('button').removeClass('ch_color');
  $(target).toggleClass('ch_color'); 
  $('.ch_color').css({'border-color':'black'});

  if(target.innerHTML == "AC"){
    display_number.innerHTML = "0";
  } else if (target.innerHTML == "=") {
    if(display_number.innerHTML != "0"){
      tmp_cnt = 0;
      keisu = 1;
      if((display_number.innerHTML).indexOf('\.') != -1) {
        tmp_str = (display_number.innerHTML).split(/\+|\-|\*|\//);
        for(i = 0; i < tmp_str.length; i++ ) {
          if(tmp_str[i].indexOf('\.') != -1) {
            shousu_str = tmp_str[i].split('.');
            if(tmp_cnt < shousu_str[1].length) {
              tmp_cnt = shousu_str[1].length;
            }
          }
        }
      }
  
      if(tmp_cnt == 0) {
        display_number.innerHTML = eval(display_number.innerHTML); 
      } else {
        keisu = 10 ** tmp_cnt;
        display_number.innerHTML = eval(`(${keisu}*` + display_number.innerHTML + `)/${keisu}`);
      }
    }
  } else {
    renketu(target);
  }
}
