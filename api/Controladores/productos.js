var productosmo = require ("../Modelos/productosmo.js").productosmo


productos.save =function (request,response){
    
  var post = {
    cod_cat:request.body.cod_cat,
    cod_prod:request.body.cod_prod,
    nombre: request.body.nombre,
    estado: request.body.estado,
    precio: request.body.precio,
    imagen: request.body.imagen
    
  }

  if(post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == "") {
    response.json({state: false, mensaje: "El campo cod_cat es obligatorio", campo: "cod_cat"})
    return false
  }

  if(post.cod_prod == undefined || post.cod_prod == null || post.cod_prod == "") {
    response.json({state: false, mensaje: "El campo cod_prod es obligatorio", campo: "cod_prod"})
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
  if(post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({state: false, mensaje: "El campo precio es obligatorio", campo: "precio"})
    return false
  }
  // if(post.imagen == undefined || post.imagen == null || post.imagen == "") {
  //   response.json({state: false, mensaje: "El campo,imagen es obligatorio", campo: "imagen"})
  //   return false
  // }

  
  productosmo.buscarcodigo(post, function(resultado){
    console.log(resultado)
    if(resultado.state == true){
      productosmo.crear(post, function(respuesta){
        if( respuesta.state ==true ){
         response.json({state: true, mensaje:" Producto creado Correctamente"})
         return false
        }
        else {response.json({state: false, mensaje:" error al crear"})
         return false
        } 
      })

    }
   else{
     response.json({ state: false, mensaje:" Codido de producto ya existe"})
     return false
   }
 })

 

  
    
   
}   

productos.listar=function(request,response){
  productosmo.listar(null, function(respuesta){
    response.json(respuesta)
  })
}

productos.listarid=function(request,response){
  var post={
    _id: request.body._id
    
  }
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo _id es obligatorio", campo:"_id"})
    return false
  }
  productosmo.listarid(post,function(respuesta){
    response.json(respuesta)
  })
}


productos.update=function(request,response){
  var post={
    _id:request.body._id,
    cod_cat:request.body.cod_cat,
    nombre:request.body.nombre,
    estado:request.body.estado,
    precio:request.body.precio,
    imagen:request.body.imagen
  }
  if(post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == "") {
    response.json({state:true, mensaje:" El campo cod_cat es obligatorio", campo:"cod_cat"})
    return false
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
  if(post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({state:true, mensaje:" El campo precio es obligatorio", campo:"precio"})
    return false
  }
  // if(post.imagen == undefined || post.imagen == null || post.imagen == "") {
  //   response.json({state:true, mensaje:" El campo Imagen es obligatorio", campo:"imagen"})
  //   return false
  // }

  productosmo.update(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se actualizo correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al actualizar", error:respuesta})
    }

  })

  
}

productos.delete=function(request,response){
  var post={
    _id:request.body._id
    
  }
  
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo id es obligatorio", campo:"_id"})
    return false
  }


  productosmo.delete(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se elimino correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al eliminar", error:respuesta})
    }

  })

  
}





module.exports.productos=productos