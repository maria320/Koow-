/***
JS by https://codepen.io/GRSimon/
***/
var getaudio = $('#player')[0],
    mouseovertimer,
    audiostatus = 'off',
    playerControls = ".player-controls";

    var audio,
    analyser,
    audioContext,
    sourceNode,
    stream;

var svg = document.getElementById('svg'),
    svgNS = svg.namespaceURI,
    g = document.createElementNS(svgNS, "g");

var width = window.innerWidth,
    height = window.innerHeight,
    maxHeight = Math.max(height * 0.3, 300),
    fftSize = 512, // 512
    tilt = 40,
    choke = 110,
    c = 0;

$(document).on('mouseleave', playerControls, function () {

    if (mouseovertimer) {

        window.clearTimeout(mouseovertimer);
        mouseovertimer = null;

    }

});

$(document).on('click touch', playerControls, function (e) {

    e.preventDefault();
  
    if (!$(playerControls).hasClass("playing")) {
        var elemento = document.getElementById("holi");
        elemento.className += " glitch--animate";
        audio = new Audio();
        audio.src ="Data/music/LSD - Genius ft. Sia, Diplo, Labrinth.mp3";
        setup();
        console.log(audio);
        console.log(setup());

        if (audiostatus == 'off') {
            $(playerControls).addClass('playing');
            getaudio.load();
            getaudio.play();
            window.clearTimeout(mouseovertimer);
            audiostatus = 'on';
            return false;

        } else if (audiostatus == 'on') {

            $(playerControls).addClass('playing');
            getaudio.play();
          
         
        }

    } else if ($(playerControls).hasClass("playing")) {
        getaudio.pause();
        $(playerControls).removeClass('playing');
        window.clearTimeout(mouseovertimer);
        audiostatus = 'on';
        var elemento = document.getElementById("holi");
        elemento.classList.remove("glitch--animate");
    }

    return false;

});

$('#player').on('ended', function () {
    $(playerControls).removeClass('playing');
    audiostatus = 'off';
});

document.querySelectorAll('.next').forEach(function (button) {
    button.addEventListener('click', function () {
        $(playerControls).removeClass('playing');
        audiostatus = 'off';
        getaudio.pause();
    });
});



// linead que se mueven con la musica
// setup inicia la play
function setup() {
    audio.addEventListener('canplay', function () {
      document.body.className+='loaded';
      audioContext = new AudioContext();
      analyser = (analyser || audioContext.createAnalyser());
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 1;//0.75;
      analyser.fftSize = fftSize;

      sourceNode = audioContext.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      sourceNode.connect(audioContext.destination);

     console.log("sip");
      update();
    });
  }

  function shape(g, freqValue, freqSequence, freqCount, colorSequence) {
    var freqRatio = freqSequence/freqCount,
        x = (width - (tilt * 2)) * freqRatio + tilt,
        y = height / 2;

    var polyline = document.createElementNS(svgNS, "polyline"),
        // using power to increase highs and decrease lows
        freqRatio = freqValue / 255,
        throttledRatio = (freqValue - choke) / (255 - choke),
        strokeWidth = width / freqCount * 0.6 * throttledRatio,
        throttledY = Math.max(throttledRatio, 0) * maxHeight,
        // color
        color = "hsl(" + 
          ((freqSequence / 2) + Math.floor(colorSequence)) + ", " + 
          100 + "%," + 
          freqRatio * 80 + "%" +
        ")";

    var loc_x = x - strokeWidth / 2,
        loc_y1 = y - throttledY / 2,
        loc_y2 = y + throttledY / 2,
        x_offset = tilt * throttledRatio;

    if (throttledRatio > 0) {
      var point_1 = (loc_x - x_offset) + "," + loc_y1,
          point_2 = (loc_x + x_offset) + "," + loc_y2;
      var points = [ point_1, point_2 ];
    } else {
      var points = [loc_x + "," + (y-1),loc_x + "," + (y+1)]
    }

    polyline.setAttribute("stroke-width", strokeWidth);
    polyline.setAttribute("stroke", color);
    polyline.setAttribute("points", points.join(" "));
    g.appendChild(polyline);
  }

  svg.setAttribute("width", width+"px");
  svg.setAttribute("height", height+"px");
  svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  svg.appendChild(g);

  function update() {
    g.remove();
    g = document.createElementNS(svgNS, "g");
    var freqArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(freqArray);

    for (var i = 0; i < freqArray.length; i++) {
      var v = freqArray[i];
      shape(g, v, i+1, freqArray.length, c);
    }
    svg.appendChild(g);

    c += 0.5;
    requestAnimationFrame(update);
  }