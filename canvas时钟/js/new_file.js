/*ctx.beginPath();
ctx.lineWidth=1;
ctx.arc(0,0,150-20,0,2*Math.PI,true);
ctx.stroke();*/

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');
var drowBackground = function(width, height) {
	canvas.width = width;
	canvas.height = height;
	ctx.beginPath();
	ctx.translate(width / 2, width / 2);
	ctx.lineWidth = 10;
	ctx.arc(0, 0, width / 2 - ctx.lineWidth / 2, 0, 2 * Math.PI, true);
	ctx.stroke();
	//数字
	for(var i = 1; i <= 12; i++) {
		ctx.font = "20px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		var rad = 2 * Math.PI / 12 * (i - 3);
		var x = Math.cos(rad) * (width / 2 - 40);
		var y = Math.sin(rad) * (width / 2 - 40);
		ctx.fillText(i, x, y);
	}
	//60个点
	for(var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (width / 2 - 20);
		var y = Math.sin(rad) * (width / 2 - 20);
		ctx.beginPath();
		if(i % 5 == 0) {
			ctx.fillStyle = "#000";
			ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
		} else {
			ctx.fillStyle = "#ddd";
			ctx.arc(x, y, 2, 0, 2 * Math.PI, true)
		}

		ctx.fill();
	}

}


var drowClock = function(hour, minute, second, width) {
	//时针 分针 秒针
	var f_hour = function() {
		ctx.save();
		ctx.beginPath();
		var mrad = minute / 60 * 2 * Math.PI / 12;
		var rad = 2 * Math.PI / 12 * hour + mrad;
		ctx.rotate(rad);
		ctx.lineWidth = 6;
		ctx.moveTo(0, 10);
		ctx.lineTo(0, -width / 2 / 3);
		ctx.lineCap = 'round';
		ctx.stroke();
		ctx.restore();
	}
	var f_minute = function() {
		ctx.save();
		ctx.beginPath();
		var srad = 2 * Math.PI / 3600 * second;
		var rad = 2 * Math.PI / 60 * minute + srad;
		ctx.lineWidth = 3;
		ctx.rotate(rad);
		ctx.moveTo(0, 10);
		ctx.lineTo(0, -width / 2 * 0.7);
		ctx.lineCap = 'round';
		ctx.stroke();
		ctx.restore();
	}
	var f_second = function() {
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 60 * second;
		ctx.lineWidth = 1;
		ctx.rotate(rad);
		ctx.fillStyle = "#F00";
		ctx.moveTo(-2, 20);
		ctx.lineTo(2, 20);
		ctx.lineTo(1, -width / 2 * 0.8);
		ctx.fill();
		ctx.restore();
	}
	var f_dot = function() {
		//中心点
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		ctx.fill();
	}
	f_hour();
	f_minute();
	f_second();
	f_dot();
}


var clock = function(width, height) {
	drowBackground(width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drowClock(hour, minute, second, width);
}
clock(400, 500);
var i=0.1;
setInterval(function() {
	clock(400, 500);
	i=i+0.1;
},1);