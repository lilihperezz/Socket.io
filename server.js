var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    users = [];

app.use('/', express.static(__dirname + '/www'));

var Log = require("log"),
    log = new Log("debug")

server.listen(process.env.PORT || 3000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
app.use(express.static('public'));

app.get('/',function(req, res){
    res.redirec("index.html");
});

io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            users.splice(socket.userIndex, 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);

    });

 socket.on("stream",function(image){
    socket.broadcast.emit("stream",image);

 });
 socket.on('draw' ,function(_movimientos){ 
    console.log(_movimientos);
        socket.emit('update', _movimientos);
        socket.broadcast.emit('update', _movimientos);
    });
});