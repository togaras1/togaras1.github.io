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
      $(element)
        .find('.vhs_image')
        .css({'display': 'none'})
    }else{
      $(element)
        .find('.vhs_image')
        .css({'display': 'block'});
    }
  });
}

$(function(){
  $(window).on("resize", function(){
    image_or_none();
  });
});

$(window).on("load", function(){
  image_or_none();
});
