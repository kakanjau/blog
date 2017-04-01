````
$('a[href*=#]').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
    if ($target.length) {
      scrollTo($target);
      return false;
    }
  }
});

function scrollTo($target, time){
  var targetOffset = $target.offset().top;
  $('html,body').animate({
    scrollTop: targetOffset
  },time || 500);
}
````