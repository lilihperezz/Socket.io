var express = require('express');
var app =  express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//configurar archivos públicos-estáticos(css-js-img)

app.use('/static',express.static(__dirname + '/static'));

//configurar pug - setear variables views express
app.set('views',__dirname + '/views');
app.set('view engine', 'pug')

//socket.io escucha los metodos implementados desde el lado del cliente y del server
var contador = 0;
io.on('connection', function(socket){
	contador++;
	io.sockets.emit('welcome', contador);
//socket en escucha - var movimientos (que cliente pasa al server y el server se encarga de emitir a todos los clientes)
	socket.on('draw' ,function(_movimientos){ 
		io.sockets.emit('update', _movimientos);
	})
})


app.get('/', function(req,res){
	res.render('home',{message: 'Draw your ideas here'});
});

//para iniciar el servidor
http.listen(3000,function(){
	console.log('El server está escuchando el puerto :3000');
});