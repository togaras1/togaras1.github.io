var randn = function(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);
}

$(function(){
  $('#navbutton').on('click', function(){
    $(this).toggleClass('_nav');
    $("#navMenu").toggleClass('show');
  });
})
