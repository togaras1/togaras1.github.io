var randn = function(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);
}

$(function(){
  var font_array = ['ff1','ff2','ff3','ff5','ff6','ff7'];
  var current_id = 0;
  var $text = $('.text');
  var font_crash_flag = false;

  var $vhs_glitch = $('.vhs-glitch');
  var vhs_image_src;
  $vhs_glitch.each(function(index, element){
    vhs_image_src = 'url(' + $(element).data('src') + ')';
    $(element).find('.vhs_image').css({'background-image': vhs_image_src})
  });

  function fontStart(delta){
    current_id = current_id+delta;
    if(current_id > font_array.length){
      current_id = 0;
    }else if (current_id < 0){
      current_id = font_array.length+delta;
    }
  }

  var $vhs = $('.vhs');
  var crash_timer;
  $(window).on("wheel", function(){
    $vhs.addClass('-bitcrash');
    clearTimeout(crash_timer);

    if(!font_crash_flag){
      fontStart(Math.abs(event.deltaY/100));
      font_crash_flag = true;
    }

    crash_timer = setTimeout(function(){
      $vhs.removeClass('-bitcrash');
      font_crash_flag = false;

      $text.each(function(index, element){
        $(element)
          .removeClass(function(index, className){
            return (className.match(/\bff\S+/g) || []).join(' ');
          })
          .addClass(font_array[Math.floor(current_id)])
          .addClass('lo-fi');

          if (font_array[Math.floor(current_id)] == undefined) {
            $(element).removeClass('lo-fi');
          }
      })
    }, 100);
  });
});

// vhs_glitch
$(function(){
  var icon_array = ['c1','c2','c3','c4','c5','c4','c3','c2'];
  var icon_len = icon_array.length;
  var icon_current_id = 0;
  var $vhs = $('.vhs');
  var $vhs_glitch = $('.vhs-glitch');

  function changeImage(){
    $vhs_glitch.each(function(index, element){
      //icon_current_id++;

      vhs_image_src = $(element).data('src').replace(icon_array[0],icon_array[Math.floor(icon_current_id)%icon_len]);

      $(element)
        .find('.vhs_image')
        .css({
          'background-image': 'url(' + vhs_image_src + ')'
        })

      icon_current_id = icon_current_id % icon_len;
    });
  }

  $(window).on("wheel", function(){
    icon_current_id = icon_current_id + event.deltaY/200;

    if (icon_current_id < 0) {
      icon_current_id = icon_len-1;
    }

    changeImage();
  });
})

// icon_animation
$(function(){
  var icon_array = ['c1','c2','c3'];
  var icon_len = icon_array.length;
  var icon_current_id = 0;
  var $works = $('.works_image');
  var $arrival = $('#icon_arrival');
  var $swap_list = [$('#icon_swap_list_1'), $('#icon_swap_list_2'), $('#icon_swap_list_3')];
  var $text_swap_list = [$('#dialog_swap_list_1'), $('#dialog_swap_list_2'), $('#dialog_swap_list_3')];
  var pos = 0;

  var resetText = function(){
    $('#dialog_text_hidden').text('');
    $('#dialog_text_active').text('');
    $('#dialog_text_arrival_1').text('');
    $('#dialog_text_arrival_2').text('');
    $('#dialog_text_arrival_3').text('');
    $('#dialog_text_arrival_4').text('');
  }

  var nextText = function(){
    resetText();
    $('#dialog_text_hidden').text($text_swap_list[pos].text());
    pos++;
    pos = pos % $text_swap_list.length;
  }

  var init = function(){
    $arrival.off('webkitAnimationEnd');
    for (let i = 0; i < 3; i++) {
      $swap_list[i].off('webkitAnimationEnd');
    }
  }

  var addEvent = function(){
    $arrival.on('webkitAnimationEnd', function(){
      $arrival.addClass("hidden");
      $arrival.removeClass("visible");
      $swap_list[0].removeClass("hidden");
      $swap_list[0].addClass("visible");
    });
    for (let i = 0; i < 3; i++) {
      $swap_list[i].on('webkitAnimationEnd', function(){
        $swap_list[i].addClass("hidden");
        $swap_list[i].removeClass("visible");
        $swap_list[(i+1)%3].removeClass("hidden");
        $swap_list[(i+1)%3].addClass("visible");
      });
    }
  }

  addEvent();
  nextText();

  $('.works_next_button').on('click', function(){
    let $_ = $works.find('.visible');
    $_.addClass("hidden");
    $_.removeClass("visible");
    $arrival.removeClass("hidden");
    $arrival.addClass("visible");
    nextText();
  });
})

$(function(){
  var $text_arrival_list = [$('#dialog_text_active'), $('#dialog_text_arrival_1'), $('#dialog_text_arrival_2'), $('#dialog_text_arrival_3'), $('#dialog_text_arrival_4'), $('#dialog_text_hidden')]

  var addEvent = function(){
    for (let i = 0; i < 5; i++) {
      var $t1 = $text_arrival_list[i];
      var $t2 = $text_arrival_list[i+1];

      let t = $t2.text();
      if (t.length > 0) {
        $t1.text($t1.text() + t.charAt(0));
        $t2.text(t.substring(1));
      }
    }
  }

  setInterval(addEvent, 30);
})

$(function(){
  $('#navbutton').on('click', function(){
    $(this).toggleClass('_nav');
    $("#navMenu").toggleClass('show');
  });
})
