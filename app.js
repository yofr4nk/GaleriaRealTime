var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var puerto = process.env.PORT || 3000;
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

	socket.on('Eliminar imagen',function(id){

		for(i in img){
			if(id==img[i].id_img){
				img.splice(i, 1);
				for(var index = com.length; index--;) {
					if(com[index].id === id) {
					  com.splice(index, 1);
					}
				}
			}
		}
		io.emit('del_img',id);
		io.emit('add_count',img.length);
	})
	socket.on('llamar comentarios',function(comm){
		send_com=[];
		for(i in com){
			if(com[i].id==comm){
				send_com.push({id:com[i].id,hora:com[i].hora,comentario:com[i].comentario});
			}
		}
		console.log(com);
		io.emit('cargar_comentarios',send_com);
	});
	socket.on('comentar',function(pkg){
		var Fecha = new Date();
		var Hora = Fecha.getHours()+":"+Fecha.getMinutes();
		com.push({id:pkg.id,hora:Hora,comentario:pkg.comentario});
		send_com=[];
		for(i in com){
			if(com[i].id==pkg.id){
				send_com.push({id:com[i].id,hora:com[i].hora,comentario:com[i].comentario});
			}
		}
		io.emit('agregar_comentarios',send_com);
	});
});
server.listen(puerto,function(){
	console.log('Servidor Funcionando');
});