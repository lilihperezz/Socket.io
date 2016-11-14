//var express para llamar librería express
var express = require('express');
// para que se ejecute la librería
var app = express();
//creamos servidor para requerir librería htpp de node
var server = require('http').createServer(app);
//creamos var io tendrá todas las funcionalidades de los sockets
var io = require('socket.io')(server);

//Para usar la camara
var Log = require("log"),
	log = new Log("debug")

var port = process.env.PORT || 8080; 

//Para usar la parte publica de ficheros estáticos
 app.use(express.static('public'));
//app donde está express cuando reciba un get en la ruta raiz active la sgt acción
 //mande un estatus ok y que envie msj.
app.get('/',function(req, res){
	res.redirec("index.html");
});
// escuchar mensaje del navegador o servidor ,msj viene del navegador(html)
io.on('connection',function(socket){
	
 socket.on("stream",function(image){
 	socket.broadcast.emit("stream",image);

 });
});

//probando 
server.listen(8080,function(){
	console.log("servidor encendido en http://localhost:8080");
})