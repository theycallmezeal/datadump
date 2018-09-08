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

function uiReset() {
	setWidth("0%");
	turnOff("stage1");
	turnOff("stage2");
	turnOff("stage3");
	turnOff("stage4");
}

function uiStage1() {
	turnOn("stage1");
	setWidth("25%");
}

function uiStage2() {
	turnOn("stage2");
	setWidth("50%");
}

function uiStage3() {
	turnOn("stage3");
	setWidth("75%");
}

function uiStage4() {
	turnOn("stage4");
	setWidth("100%");
}
	
function turnOn(id) {
	$("#" + id).addClass("active");
}

function turnOff(id) {
	$("#" + id).removeClass("active");
}

function setWidth(width) {
	$("#progress-bar-inside").css("width", width);
}
