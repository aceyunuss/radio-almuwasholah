
$(document).ready(function () {

  $('.play-stop').click(function () {
    if (!$(this).hasClass('play')) {
      $(this).attr('src', 'asset/play-48.png');
      $(this).addClass('play')
      $("#stream")[0].pause()
      // $('.cycle-slideshow').cycle('stop');
    } else {
      $(this).attr('src', 'asset/stop-48.png');
      $(this).removeClass('play')
      $("#stream")[0].play()
      // $('.cycle-slideshow').cycle('resume');
    }
  });

  $('#volume').on('change', setVolume);

  function setVolume(e) {
    var volume = e.target.value;
    console.log(volume);
    $("#stream")[0].volume = volume;
  }

});