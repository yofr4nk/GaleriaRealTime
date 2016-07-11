var socket = io();
var cl = console.log.bind(console);
socket.on('agregarimg',function(imagen){
	cargar_imagenes(imagen);
	contador = imagen.length;
});
function cargar_imagenes(dato){
	var new_img = 	dato.map(function(dato,index){
							return('<tr id="'+dato.id_img+'"><td width="20px"><img class="img-responsive img_td"  src="'+dato.imagen+'" /></td><td width="5px"><button class="btn btn-danger del" onclick="del(this)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
					}).join(" ");
	$('.contenedor')[0].innerHTML = new_img;
}
socket.on('del_img',function(boton){
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