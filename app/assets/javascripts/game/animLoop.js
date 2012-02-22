// see this article for more information regarding animLoop.js:
// http://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/

// specifically, the code for this was taken from:
// https://gist.github.com/1114293#file_anim_loop_x.js

// Cross browser, backward compatible solution
(function( window, Date ) {
// feature testing
var raf = window.mozRequestAnimationFrame    ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame     ||
          window.oRequestAnimationFrame;

window.animLoop = function( render, element ) {
  var running, lastFrame = +new Date;
  function loop( now ) {
    if ( running !== false ) {
      raf ?
        raf( loop, element ) :
        // fallback to setTimeout
        setTimeout( loop, 16 );
      // Make sure to use a valid time, since:
      // - Chrome 10 doesn't return it at all
      // - setTimeout returns the actual timeout
      now = now && now > 1E4 ? now : +new Date;
      var deltaT = now - lastFrame;
      // do not render frame when deltaT is too high
      if ( deltaT < 160 ) {
        running = render( deltaT, now );
      }
      lastFrame = now;
    }
  }
  loop();
};
})( window, Date );
