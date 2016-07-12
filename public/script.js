var socket = io();
var cl = console.log.bind(console);
socket.on('agregarimg',function(imagen){
	cargar_imagenes(imagen);
	//contador = imagen.length;
});
function cargar_imagenes(dato){
	
	var new_img = 	dato.map(function(dato,index){
						var thumbnails = `<div class="row" id="${dato.id_img}">
											<div class="col-md-12 col-sm-12" >
												<div class="thumbnail">
													<img class="img-responsive img" src="${dato.imagen}" alt="...">
													<div class="caption">
														<p><button class="btn btn-info btn_sty" role="button" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-comment"></span></button> <button class="btn btn-danger btn_sty" onclick="del('${dato.id_img}')" role="button"><span class="glyphicon glyphicon-remove"></span></button></p>
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