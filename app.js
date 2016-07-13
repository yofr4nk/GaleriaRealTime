var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var img = [];
var com = [];
app.use(express.static('public'))

io.on('connection',function(socket){
	socket.emit('agregarimg',img);
	socket.emit('add_count',img.length);
	socket.emit('cargar_comentarios',com);
	socket.on('imagen enviada',function(imagen){
		var Fecha = new Date();
		var id_img = Fecha.getMinutes()+"-"+Fecha.getSeconds()+"-"+Fecha.getHours();
		img.push({imagen:imagen,id_img:id_img});
		io.emit('agregarimg',img);
		io.emit('add_count',img.length);
	})

	socket.on('Eliminar imagen',function(boton){
		for(i in img){
			if(boton==img[i].id_img){
				img.splice(i, 1);
			}
		}
		io.emit('del_img',boton);
		io.emit('add_count',img.length);
	})
	socket.on('llamar comentarios',function(comm){
		send_com=[];
		for(i in com){
			if(com[i].id==comm){
				send_com.push({id:com[i].id,comentario:com[i].comentario});
			}
		}
		io.emit('cargar_comentarios',send_com);
	});
	socket.on('comentar',function(pkg){
		var Fecha = new Date();
		var Hora = Fecha.getHours()+":"+Fecha.getMinutes();
		com.push({id:pkg.id,hora:Hora,comentario:pkg.comentario});
		io.emit('agregar_comentarios',com);
	});
});
server.listen(3000,function(){
	console.log('Servidor Funcionando');
});