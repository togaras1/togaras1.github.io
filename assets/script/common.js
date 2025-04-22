var randn = function(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);
}

$(function(){
  $('#navbutton').on('click', function(){
    $(this).toggleClass('_nav');
    $("#navMenu").toggleClass('show');
  });
});

var image_or_none = function(){
  var pc = 1270;
  var windowWidth = $(window).width();
  var $vhs_glitch = $('.vhs-glitch');

  $vhs_glitch.each(function(index, element){
    if (windowWidth < pc){
      _fimg = $(element)
        .find('.vhs_image')
        .css({'display': 'none'});
      $(_fimg[0]).css({'display': 'block'});
    }else{
      $(element)
        .find('.vhs_image')
        .css({'display': 'block'});
    }
  });
}

$(window).on("resize", function(){
  image_or_none();
});

$(window).on("load", function(){
  image_or_none();
});

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

