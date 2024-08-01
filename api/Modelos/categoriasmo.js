var categoriasmo= {}
const { request } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categoriasSchema = new Schema({
    
    cod_cat:String,
    nombre:String,
    estado:String

    
})

const myModel = mongoose.model("categorias", categoriasSchema)




categoriasmo.buscarcodigo = function(post, callback){

    myModel.find({cod_cat:post.cod_cat},{nombre:1,cod_cat:1}).then((respuesta) =>{
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
     
    
    
    //    var posicion = productos.findIndex((item) =>item.cod_cat == post.cod_cat)
    //    return callback({posicion:posicion})

}

categoriasmo.listar = function(post,callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}

categoriasmo.listarid = function(post,callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}

categoriasmo.crear = function(post, callback){
    
    const instancia= new myModel
    
    instancia.cod_cat = post.cod_cat
    instancia.nombre = post.nombre
    instancia.estado= post.estado

    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})


    })
    

}

categoriasmo.update = function(post,callback){
    myModel.updateOne({_id:post._id},{nombre: post.nombre, estado:post.estado}).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
} 

categoriasmo.delete= function(post,callback){
    myModel.deleteOne({_id:post._id},{nombre: post.nombre, estado:post.estado}).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
}






module.exports.categoriasmo=categoriasmo