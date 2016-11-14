//var canvas para guardar la informacion de la camara, esta en display none
var canvas = document.getElementById("preview");
var context = canvas.getContext("2d");

//damos un ancho y alto para poder vernos en la camara
canvas.width = 800;
canvas.height = 600;

context.width = canvas.width;
context.height = canvas.height;

//var para llamar al id video para poder ver 
var video = document.getElementById("video");

var socket = io();

function logger(msg){
	$("#logger").text(msg);
}
//funcion para leer la camara 
function loadCam(stream){
	video.src = window.URL.createObjectURL(stream);
	logger("Cámara cargada correctamente [OK]");
}

function loadFail(){
	logger("camara no conectada! Revise su camara por favor");
}
//funcion para ver la camara 
function viewVideo(video, context){
	context.drawImage(video,0,0,context.width,context.height);
	socket.emit("stream",canvas.toDataURL("image/webp"));
}
//funcion para la camara 
$(function(){
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mozGetUserMedia);	
	if(navigator.getUserMedia){
		navigator.getUserMedia({video: true	},loadCam,loadFail)
	}
	setInterval(function(){
		viewVideo(video,context);
	},70);
});
