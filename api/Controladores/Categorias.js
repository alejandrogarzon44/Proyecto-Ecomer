var categoriasmo = require("../Modelos/categoriasmo.js").categoriasmo

categorias.save =function (request,response){
    
  var post = {
    
    cod_cat:request.body.cod_cat,
    nombre: request.body.nombre,
    estado: request.body.estado
  }

  

  if(post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == "") {
    response.json({state: false, mensaje: "El campo cod_cat es obligatorio", campo: "cod_cat"})
    return false
  }


  if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
    response.json({state: false, mensaje: "El campo nombre es obligatorio", campo: "nombre"})
    return false
  }
  if( post.estado== undefined || post.estado == null || post.estado == "" ){
    response.json ({state: false,mensaje:" El campo estado es obligatorio", campo: "estado"})
    return false
  }
  
  categoriasmo.buscarcodigo(post, function(resultado){
    console.log(resultado)
    if(resultado.state == true){
      categoriasmo.crear(post, function(respuesta){
        if( respuesta.state ==true ){
         response.json({state: true, mensaje:" Categoria creada Correctamente"})
         return false
        }
        else {response.json({state: false, mensaje:" error al crear"})
         return false
        } 
      })

    }
   else{
     response.json({ state: false, mensaje:" Categoria ya existe"})
     return false
   }
 })

 

  
    
   
}   

categorias.listar=function(request,response){
  categoriasmo.listar(null, function(respuesta){
    response.json(respuesta)
  })
}

categorias.listarid=function(request,response){
  var post={
    _id: request.body._id
    
  }
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo _id es obligatorio", campo:"_id"})
    return false
  }
  categoriasmo.listarid(post,function(respuesta){
    response.json(respuesta)
  })
}


categorias.update=function(request,response){
  var post={
    _id:request.body._id,
    nombre:request.body.nombre,
    estado:request.body.estado
  }
  
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo id es obligatorio", campo:"_id"})
    return false
  }

  if(post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({state:true, mensaje:" El campo nombre es obligatorio", campo:"nombre"})
    return false
  }

  if(post.estado == undefined || post.estado == null || post.estado == "") {
    response.json({state:true, mensaje:" El campo estado es obligatorio", campo:"estado"})
    return false
  }

  categoriasmo.update(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se actualizo correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al actualizar", error:respuesta})
    }

  })

  
}

categorias.delete=function(request,response){
  var post={
    _id:request.body._id
    
  }
  
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo id es obligatorio", campo:"_id"})
    return false
  }


  categoriasmo.delete(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se elimino correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al eliminar", error:respuesta})
    }

  })

  
}




module.exports.categorias=categorias 