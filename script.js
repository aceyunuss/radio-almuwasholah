$(document).ready(function () {

  $audio = $("#stream")[0]
  getStream();

  $('.play-stop').click(function () {
    if (!$(this).hasClass('goPlay')) {
      $(this).addClass('goPlay')
      $audio.pause()
      $("#stream").prop("src", "none")
    } else {
      $(this).removeClass('goPlay')
      getStream()
    }
  });


  $('#volume').on('change', setVolume);


  function setVolume(e) {
    var volume = e.target.value;
    $audio.volume = volume;
  }


  function getStream() {
    $.get("https://radio.almuwasholah.com/api/nowplaying/almuwasholah", function (data, status) {
      let streamlink = data.station.listen_url
      let playing = data.now_playing
      let artist = playing.song.artist != "" ? playing.song.artist : "~"
      let title = playing.song.title != "" ? playing.song.title : ""

      $(".artist").text(artist)
      $(".title").text(title)
      $("#stream").prop("src", streamlink)
      $(".pict").css('background-image', 'url("' + playing.song.art + '")');
      
      if (!$(".play-stop").hasClass('goPlay')) {
        $audio.play()
      }

      refreshText(playing.remaining * 1000)
    });
  }


  function refreshText(time) {
    setTimeout(() => {
      getStream();
    }, time);
  }


  $('.play').click(function () {
    $(this).toggleClass('active');
    return false;
  });

});