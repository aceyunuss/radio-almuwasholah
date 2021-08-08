$(document).ready(function () {

  $audio = $("#stream")[0]
  getStream("play");

  $('.play-stop').click(function () {
    if (!$(this).hasClass('play')) {
      $(this).attr('src', 'asset/play-48.png');
      $(this).addClass('play')
      $audio.pause()
      $("#stream").prop("src", "none")
      // $('.cycle-slideshow').cycle('stop');
    } else {
      $(this).attr('src', 'asset/stop-48.png');
      $(this).removeClass('play')
      getStream("play")
      // $('.cycle-slideshow').cycle('resume');
    }
  });


  $('#volume').on('change', setVolume);


  function setVolume(e) {
    var volume = e.target.value;
    $audio.volume = volume;
  }


  function getStream(type) {
    $.get("https://radio.almuwasholah.com/api/nowplaying/almuwasholah", function (data, status) {
      let streamlink = data.station.listen_url
      let playing = data.now_playing
      let artist = playing.song.artist != "" ? playing.song.artist : "~"
      let title = playing.song.title != "" ? playing.song.title : ""

      $(".artist").text(artist)
      $(".title").text(title)
      $("#stream").prop("src", streamlink)

      // if (type == "play") {
      // }
      $audio.play()

      refreshText(playing.remaining * 1000)
    });
  }


  function refreshText(time) {
    setTimeout(() => {
      getStream("refreshtext");
    }, time);
  }

});