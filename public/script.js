var socket = io();
var cl = console.log.bind(console);
socket.on('agregarimg',function(imagen){
	cargar_imagenes(imagen);
});
function cargar_imagenes(dato){
	
	var new_img = 	dato.map(function(dato,index){
						var thumbnails = `<div class="row" id="${dato.id_img}">
											<div class="col-md-12 col-sm-12" >
												<div class="thumbnail">
													<img class="img-responsive img" src="${dato.imagen}" alt="...">
													<div class="caption">
														<p><button class="btn btn-info btn_sty" role="button" data-toggle="modal" onclick="load_coms('${dato.id_img}')" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-comment"></span></button> <button class="btn btn-danger btn_sty" onclick="del('${dato.id_img}')" role="button"><span class="glyphicon glyphicon-remove"></span></button></p>
													</div>
												</div>
											</div>
										</div>`; 
						return(thumbnails);
					}).join(" ");
	$('.cont')[0].innerHTML = new_img;
}
socket.on('del_img',function(boton){
	$("#"+boton+"").remove();
});
socket.on('add_count',function(contador){
	$("#contador")[0].innerText=contador;
});
socket.on('cargar_comentarios',function(comm){
	var listar_com = 	comm.map(function(dato,index){
							var comen = `<div class="row" id="${dato.id}">
											<div class="col-md-2">
												<p> ${dato.hora}</p>
											</div>
											<div class="col-md-10">
												<p>${dato.comentario}</p>
											</div>
										</div>`;
							return(comen);
						}).join(" ");
	$('.modal-body')[0].innerHTML = listar_com;
});
socket.on('agregar_comentarios',function(comm){
	cl(comm);
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
function del(id){
	socket.emit('Eliminar imagen',id);
}
function load_coms(id){
	$('#id_img_comentario').val(id);
	socket.emit('llamar comentarios',id);
}
function comentar(elemento){
	var id = $('#id_img_comentario').val();
	var comentario = {'id':id,'comentario':$('#comentario').val()};
	socket.emit('comentar',comentario);
}