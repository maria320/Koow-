/***
+JS by https://codepen.io/GRSimon/
+***/
var getaudio = $('#player')[0],
    mouseovertimer,
    audiostatus = 'off',
    playerControls = ".player-controls";



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
