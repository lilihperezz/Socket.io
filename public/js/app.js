
//lado cliente
//var socket va a utilizar io(librería socket io del lado cliente)y método connect
var socket = io.connect('http://localhost:8080',{'forceNew':true});
//escuchar eventos(menssages) 
socket.on('messages',function(data){
	console.log(data);
// cuando recibe mensagges
render(data);

});
//plantilla para imprimir
function render(data){
//data no es un elemento es un array ,map para interar
	var html = data.map(function(data,index){
		return(`<div>
					<strong>${data.author}</strong>:
					<em>${data.text}</em>
				</div>`);
	//para unir mediante un espacio
	}).join(" ");
	
 	document.getElementById('messages').innerHTML = html;
}
function addMessage(e){
//creamos objeto que vamos a enviar al servidor
	var payload ={
		author: document.getElementById('username').value,
		text: document.getElementById('texto').value
	};
	//emitir evento - cliente ,pero debemos escucharlo en el servidor
	socket.emit('new-message', payload);
	return false;
}