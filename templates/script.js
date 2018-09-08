var audioElement = document.createElement('audio');
audioElement.setAttribute('src', "{{ url_for('static', filename='rumble.mp3') }}");

var audioElement2 = document.createElement('audio');
audioElement2.setAttribute('src', "{{ url_for('static', filename='fanfare.mp3') }}");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swing() {
    $.post("{{ url_for('set_speed', motor='1', speed='135') }}");
    await sleep(1500);
    $.post("{{ url_for('set_speed', motor='1', speed='0') }}");
}

async function shitPost() {
    audioElement.play();
    await sleep(4000); 
    $.post("{{ url_for('set_speed', motor='0', speed='180') }}");
    await sleep(2000);
    $.post("{{ url_for('set_speed', motor='0', speed='90') }}");
    await sleep(800);
    audioElement2.play();
    await swing();
    await sleep(200);
    $.post("{{ url_for('set_speed', motor='0', speed='180') }}");
    await sleep(1000);
    $.post("{{ url_for('set_speed', motor='0', speed='90') }}");
}

$(document).ready(function(){
    $('#antishitpost').click(function() {
        $.post("{{ url_for('set_speed', motor='0', speed='45') }}");
    });
    $('#noshitpost').click(function() {
        $.post("{{ url_for('set_speed', motor='0', speed='90') }}");
    });
    $('#littleshitpost').click(function() {
        $.post("{{ url_for('set_speed', motor='0', speed='180') }}");
    });
    $('#swing').click(swing);
    $('#shitpost').click(shitPost);
});
