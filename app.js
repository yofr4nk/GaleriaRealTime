var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'))


app.get('/hello',function(req,res){
	res.send('aa');
})
io.on('connection',function(socket){
	socket.on('imagen enviada',function(imagen){
		io.emit('agregarimg',imagen)
	})
	socket.on('Eliminar imagen',function(boton){
		io.emit('del_img',boton)
	})
	socket.on('contar imagenes',function(contador){
		io.emit('add_count',contador)
	})
	
});

server.listen(3000,function(){
	console.log('Servidor Funcionando');
});