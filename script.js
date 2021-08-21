$(document).ready(function () {

  var bg = [
    'asset/1.png',
    'asset/2.jpg',
    'asset/3.jpeg',
    'asset/4.jpeg',
    // 'asset/5.jpg',
  ];

  // var Transition = 1000;

  $('.fi').css({
    'background-image': 'url(' + bg[bg.length - 1] + ')',
    'opacity': '0.5',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'margin': 'auto',
    'background-position': 'center'
  });

  window.setInterval(
    function () {
      img = bg.shift();
      bg.push(img);

      var $Backgrounds = $('.fi');
      $Backgrounds.eq(1).hide(0).css({
        'background-image': 'url(' + img + ')'
      }).fadeIn(2000);

      $Backgrounds.eq(0).show(0).fadeOut(2000, function () {
        $(this).show(0).css({
          'background-image': 'url(' + img + ')',
          'opacity': '0.5',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'margin': 'auto',
          'background-position': 'center'
        });
        $Backgrounds.eq(1).hide(0);
      });
    }, 4000
  );

  $audio = $("#stream")[0]
  getStream();

  $('.play-stop').click(function () {
    if (!$(this).hasClass('goPlay')) {
      $(this).addClass('goPlay')
      $audio.pause()
      $("#stream").prop("src", "")
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

      if (data.is_online) {

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

      } else {
        alert("Sorry we are offline")
      }

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