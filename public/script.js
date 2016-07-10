var socket = io();

socket.on('agregarimg',function(imagen){
	var Fecha = new Date();
	var id_img = Fecha.getMinutes()+"-"+Fecha.getSeconds()+"-"+Fecha.getHours();
	$('.contenedor').append('<tr id="'+id_img+'"><td width="20px"><img class="img-responsive img_td"  src="'+imagen+'" /></td><td width="5px"><button class="btn btn-danger del" onclick="del(this)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>')
	var contador = $(".contenedor")[0].children[0].children.length;
	socket.emit('contar imagenes',contador);
});
socket.on('del_img',function(boton){
	var contador = parseInt($(".contenedor")[0].children[0].children.length)-1;
	socket.emit('contar imagenes',contador);
	$("#"+boton+"").remove();
});
socket.on('add_count',function(contador){
	$("#contador")[0].innerText=contador;
});
function load(imagen){
	var id = imagen.id;
  	var input = $("#"+id+"");
	var files = input[0].files[0];
	var reader = new FileReader();
    reader.onload = function(e){
    	socket.emit('imagen enviada',e.target.result);
    }
    reader.readAsDataURL(files);
}
function del(elemento){
	var id_tr = $(elemento).parent().parent()[0].id;
	socket.emit('Eliminar imagen',id_tr);
}