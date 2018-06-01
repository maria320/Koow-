/***
+JS by https://codepen.io/GRSimon/
+***/
var getaudio = $('#player')[0],
    mouseovertimer,
    audiostatus = 'off',
    playerControls = ".player-controls";
    var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
    var colorPalette = ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"];
    var uploadLoading = false;


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


/// fondo


/*=============================================
  SETUP
=============================================*/

function preload() {
	audio=getaudio;
}

function uploaded(file) {
	uploadLoading = true;
	uploadedAudio = getaudio;
}


function uploadedAudioPlay(audioFile) {

	if (audio.isPlaying()) {
		audio.pause();
	}
	audio = audioFile;
	audio.loop();
}

function setup() {

	uploadAnim = select('#uploading-animation');

	createCanvas(windowWidth, windowHeight);
	analyzer = new p5.Amplitude();
	fft = new p5.FFT();
	audio.loop();

}



