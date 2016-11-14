//var express para llamar librería express
var express = require('express');
// para que se ejecute la librería
var app = express();
//creamos servidor para requerir librería htpp de node
var server = require('http').createServer(app);
//creamos var io tendrá todas las funcionalidades de los sockets
var io = require('socket.io')(server);
//app donde está express cuando reciba un get en la ruta raiz active la sgt acción
 //mande un estatus ok y que envie msj.
app.get('/',function(req, res){
	res.status(200).send("Hello World :)");
});

//probando
server.listen(8080,function(){
	console.log("servidor encendido en http://localhost:8080");
})