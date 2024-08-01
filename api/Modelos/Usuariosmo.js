var usuariosmo = {}
const { request } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
   
    email:String,
    password:String,
    nombre:String,
    estado:String,
    codigoact:String,
    rol:Number,
    

    
})

const myModel = mongoose.model("usuarios", usuariosSchema)



usuariosmo.buscarcodigo = function(post, callback){

    myModel.find({email:post.email},{nombre:1,email:1}).then((respuesta) =>{
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
     
    
    
    

}

usuariosmo.listar = function(post,callback){
    myModel.find({},{password:[0]}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}
usuariosmo.listarid = function(post,callback){
    myModel.find({_id:post._id},{password:0}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    })
        

}

usuariosmo.crear = function(post, callback){
    
    const instancia= new myModel
    instancia.email = post.email
    instancia.password = post.password
    instancia.nombre = post.nombre
    instancia.estado= 0
    instancia.codigoact= post.azar
    instancia.rol= 2


    
    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})


    })
    

}

usuariosmo.update = function(post,callback){
    myModel.updateOne({_id:post._id},{
        nombre: post.nombre, 
        estado:post.estado,
        rol:post.rol 
        

        
    }).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
} 

usuariosmo.delete= function(post,callback){
    myModel.deleteOne({_id:post._id},{nombre: post.nombre, estado:post.estado}).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
}

usuariosmo.login = function(post,callback){
    
    myModel.find({email:post.email, password:post.password },{nombre:1, estado: 1, roll: 1}).then((respuesta) => {
        return callback({estate: true, data:respuesta})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
        

}

usuariosmo.actualizarpass = function(post,callback){
    myModel.updateOne({_id:post._id},{
        password: post.password, 
        

        
    }).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
} 
usuariosmo.activar = function(post,callback){
    
    myModel.updateOne({email:post.email, codigoact:post.codigoact},{
        
        estado:1
       
        
    }).then((respuesta) =>{
        console.log(respuesta)
        return callback({state: true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false,mensaje:error})
    })
} 



module.exports.usuariosmo=usuariosmo