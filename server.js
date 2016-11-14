//var express para llamar librería express
var express = require('express');
// para que se ejecute la librería
var app = express();
//creamos servidor para requerir librería htpp de node
var server = require('http').Server(app);
//creamos var io tendrá todas las funcionalidades de los sockets
var io = require('socket.io')(server);
//para añadir nuevos msjs
var messages =[{
 	id:1,
 	text: "Líneas comentadas -.-!",
 	author: "Lili"
}]

//Para usar la parte publica de ficheros estáticos
 app.use(express.static('public'));
//app donde está express cuando reciba un get en la ruta raiz active la sgt acción
 //mande un estatus ok y que envie msj.
app.get('/',function(req, res){
	res.status(200).send("Hello World :)");
});
// escuchar mensaje del navegador o servidor ,msj viene del navegador(html)
// se inicia la conexión web socket con el servidor
io.on('connection',function(socket){
 	console.log("Alguien se ha conectado con sockets");
 //emitir evento messages y datos
 	socket.emit('messages',messages);
 //Escuchar evento new-message
 	socket.on('new-message',function(data){
//en el array message vamos agregar todos lo que vayan llegando
		messages.push(data);
//a todos los sockets les emita el evento messages con el array
//en vez de socket usamos el servidor io
		io.sockets.emit('messages',messages);
 });
});

//probando 
server.listen(8080,function(){
	console.log("servidor encendido en http://localhost:8080");
});