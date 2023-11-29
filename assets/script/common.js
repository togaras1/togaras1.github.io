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
