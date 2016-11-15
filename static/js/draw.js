//declarar variable socket.io
var socket = io();

socket.on('welcome',function(_contador){
	$(".contador").text(_contador);
});
var movimientos = new Array();
//variables para cuando se arrastra el mouse al dibujar
var pulsado;
//variable para el canvas (pizarra)
var context;

var crearLienzo=function(){
	var canvasDiv = document.getElementById('pizarra');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width',500);
	canvas.setAttribute('height',500);

	canvasDiv.appendChild(canvas);

	context=canvas.getContext("2d");

	$("canvas").mousedown(function(e){
		pulsado = true;
		socket.emit('draw',[ e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false]);
	});
	$("canvas").mousemove(function(e){
		if(pulsado){
			socket.emit('draw',[e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true])
		}
	});
	$("canvas").mouseup(function(e){
		pulsado = false;
	});
	$("canvas").mouseleave(function(e){
		pulsado = false;
	});
};

//para pintar

var drawing = function(mov){
	movimientos.push(mov);
	context.lineJoin ="round";
	context.lineWidth = 6;
	context.strokeStyle ="purple";
	for( var i=0; i< movimientos.length; i++){
		context.beginPath();

		if(movimientos[i][2] && i){
			context.moveTo(movimientos[i-1][0],movimientos[i-1][1]);
		}else{
			context.moveTo(movimientos[i][0],movimientos[i][1]);
		}
		context.lineTo(movimientos[i][0],movimientos[i][1]);
		context.closePath();
		context.stroke();
	}
}

socket.on('update', function(_movimientos){
	drawing(_movimientos);
})