//var socket para llamar a io en visualizar y podamos guardar la algun movimiento de la camara como jpg
var socket = io();
socket.on("stream", function(image){
	var img = document.getElementById("play");
	img.src = image;
	$("#logger").text(image);
});