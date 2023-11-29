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
          'background-image': 'url(' + vhs_image_src + ')',
      });

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
