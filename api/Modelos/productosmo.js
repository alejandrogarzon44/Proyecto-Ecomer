var productosmo = {}
const { request } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productosSchema = new Schema({
   
    cod_cat:String,
    cod_prod:String,
    nombre:String,
    estado:String,
    precio:String,
    imagen:String,

    
})

const myModel = mongoose.model("productos", productosSchema)



productosmo.buscarcodigo = function(post, callback){

    myModel.find({cod_prod:post.cod_prod},{nombre:1,cod_prod:1}).then((respuesta) =>{
        console.log(respuesta)
        
        if(respuesta.length == 0) {
            return callback({ state: true})
        } else {
            return callback({state:false})
        }    
    }).catch((error)=>{
        console.log(error)
        return callback({posicion:0,estate:false,mensaje:error})


    })
     
    
    
    //    var posicion = productos.findIndex((item) =>item.cod_prod == post.cod_prod)
    //    return callback({posicion:posicion})

}

productosmo.listar = function(post,callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}
productosmo.listarid = function(post,callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}

productosmo.crear = function(post, callback){
    
    const instancia= new myModel
    instancia.cod_cat = post.cod_cat
    instancia.cod_prod = post.cod_prod
    instancia.nombre = post.nombre
    instancia.estado= post.estado
    if(post.imagen == ""){
        instancia.imagen = "http://localhost:3000/imagenes/default.png"
    }
    else{
        instancia.imagen = post.imagen
    }
    instancia.precio = post.precio

    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})


    })
    

}

productosmo.update = function(post,callback){
    myModel.updateOne({_id:post._id},{
        nombre: post.nombre, 
        estado:post.estado, 
        cod_cat:post.cod_cat,
        imagen:post.imagen,
        precio:post.precio 
    }).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
} 

productosmo.delete= function(post,callback){
    myModel.deleteOne({_id:post._id},{nombre: post.nombre, estado:post.estado}).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
}



module.exports.productosmo=productosmo