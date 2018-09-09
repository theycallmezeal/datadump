var audioElement = document.createElement('audio');
audioElement.setAttribute('src', "{{ url_for('static', filename='rumble.mp3') }}");

var audioElement2 = document.createElement('audio');
audioElement2.setAttribute('src', "{{ url_for('static', filename='fanfare.mp3') }}");

var ctrX = 100;
var ctrY = 100;
var radius = 50;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swing() {
    $.post("{{ url_for('set_speed', motor='1', speed='135') }}");
    await sleep(1500);
    $.post("{{ url_for('set_speed', motor='1', speed='0') }}");
}

async function shitPost() {
    // audioElement.play();
	uiReset();
	decrementWipes();
	radius -= 1;
	redraw();
	
    $.post("{{ url_for('set_speed', motor='0', speed='180') }}");
	uiStage1();
    await sleep(2000);
	
    $.post("{{ url_for('set_speed', motor='0', speed='90') }}");
	uiStage2();
    await sleep(800);
	
	uiStage3();
    
    await swing();
    await sleep(200);
    $.post("{{ url_for('set_speed', motor='0', speed='180') }}");
    await sleep(1000);
	
	uiStage4();
	audioElement2.play();
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
    $('#shitpost-button').click(shitPost);
	draw();
	$('#find-toilet-paper').click(hereAPI);
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

function decrementWipes() {
	var wipes = parseInt($("#wipe-counter").html());
	$("#wipe-counter").html(wipes - 1);
}

function draw() {
	var canvas = document.getElementById("canvas").getContext("2d");
	
	canvas.height = canvas.height;
	
	canvas.beginPath();
	canvas.lineWidth = 3;
	canvas.strokeStyle = "#aaaaaa";
	canvas.fillStyle = "#cccccc";
	canvas.arc(ctrX, ctrY, 20 + radius, 0, Math.PI * 2, true);
	canvas.stroke();
	canvas.fill();
	canvas.closePath();
	
	canvas.fillStyle = "#aaaaaa";
	canvas.fillRect(78 - radius, 100, 2, 100);
	
	canvas.beginPath();
	canvas.strokeStyle = "#baa277";
	canvas.lineWidth = 10;
	canvas.arc(ctrX, ctrY, 20, 0, Math.PI * 2, true);
	canvas.stroke();
	canvas.clip();
	canvas.clearRect(0, 0, 800, 400);
	canvas.closePath();
}

function redraw() {
	var canvas = document.getElementById("canvas");
	canvas.width = canvas.width;
	draw();
}

var lastSeen = 0;

function hereAPI() {
	var queries = [
		'https://image.maps.api.here.com/mia/1.6/mapview?c=39.953170%2C%20-75.192741&z=14&app_id=0b4cmWmlbhkohH9tr1b5&app_code=k0XGaAYa8jWZxNnD7uqjWg',
		'https://image.maps.api.here.com/mia/1.6/mapview?c=39.952374%2C%20-75.170898&z=14&app_id=0b4cmWmlbhkohH9tr1b5&app_code=k0XGaAYa8jWZxNnD7uqjWg',
		'https://image.maps.api.here.com/mia/1.6/mapview?c=39.951436%2C%20-75.153045&z=14&app_id=0b4cmWmlbhkohH9tr1b5&app_code=k0XGaAYa8jWZxNnD7uqjWg'
	]
	
	var random = Math.floor(Math.random() * 3);
	while (random == lastSeen) {
		random = Math.floor(Math.random() * 3);
	}
	lastSeen = random;
	document.getElementById("tp-map").src = queries[random];
}
