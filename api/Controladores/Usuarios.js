const { config } = require("../../Config.js")
var usuarios={}
var usuariosmo = require ("../Modelos/Usuariosmo.js").usuariosmo


usuarios.save = function(request,response) {

  var post = {
    email:request.body.email,
    password:request.body.password,
    nombre: request.body.nombre,
    // estado: request.body.estado
    
  }

  if(post.email == undefined || post.email == null || post.email == "") {
    response.json({state: false, mensaje: "El campo email es obligatorio", campo: "email"})
    return false
  }

  if(post.password == undefined || post.password == null || post.password == "") {
    response.json({state: false, mensaje: "El campo password es obligatorio", campo: "password"})
    return false
  }

  if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
    response.json({state: false, mensaje: "El campo nombre es obligatorio", campo: "nombre"})
    return false
  }
  // if( post.estado== undefined || post.estado == null || post.estado == "" ){
  //   response.json ({state: false,mensaje:" El campo estado es obligatorio", campo: "estado"})
  //   return false
  // }

  
    post.password = sha256(post.password + config.passsha256)
    
    usuariosmo.buscarcodigo(post, function(resultado){
      
      if(resultado.state == true){
         
        var azar = "PTR" + Math.floor (Math.random() * (9999-1000)+ 1000);
        post.azar = azar 

        // crear correo

        const nodemailer = require( "nodemailer")
        let transporter = nodemailer.createTransport({
          host:'smtp.mail.yahoo.com',
          port:587,
          secure:false,
          requireSSL:true,
          auth:{
            user: config.useryahoo,
            pass: config.passyahoo

          }


        })


        let mailOptions = {
          from: config.useryahoo,
          to:post.email,
          subject:"Verifica tu cuenta codigo"+ post. azar,
          html:` <title>Correo de activación</title>
          <style>
              body {
               font-family: Arial, sans-serif;
               background-color: #f9f9f9;
               padding: 20px;
              }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
              color: #333;
              text-align: center;
              margin-bottom: 20px;
            }

            p {
             color: #666;
             font-size: 16px;
             line-height: 1.6;
            }

            .cta {
              display: block;
              text-align: center;
              text-decoration: none;
              color: #fff;
              background-color: #007bff;
              padding: 10px 20px;
              border-radius: 5px;
             margin-top: 20px;
            }

         </style>
         </head>
         <body>
         <div class="container">
          <h1>Código de activación</h1>
          <p>Hola, para completar tu registro, por favor utiliza el siguiente código de activación:</p>
          <p style="font-size: 24px; color: #007bff;text-align: center;">${post.azar}</p>
          <a href="http://localhost:4200/activar/${post.email}/${post.azar}" class="cta">Activar Cuenta</a>
          </div>
         </body>`
        
        }
          
        transporter.sendMail(mailOptions, (error, info) =>{
          if (error){
            return console.log(error)
          }else {
            info
          }
        } )

      

      


         
        usuariosmo.crear(post, function(respuesta){
          if( respuesta.state ==true ){
            response.json({state: true, mensaje:" Usuario creado Correctamente"})
            return false
            
          }
          else {response.json({state: false, mensaje:" error al crear"})
              return false
            }   
        })

      }
      else{
        response.json({ state: false, mensaje:" Codido de usuario ya existe"})
        return false
      }
    })

 
  
}
  
usuarios.listar=function(request,response){
  usuariosmo.listar(null, function(respuesta){
    response.json(respuesta)
  })
}

usuarios.listarid=function(request,response){
  var post={
    _id: request.body._id
    
  }
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo _id es obligatorio", campo:"_id"})
    return false
  }
  usuariosmo.listarid(post,function(respuesta){
    response.json(respuesta)
  })
}

usuarios.update=function(request,response){
  var post={
    _id:request.body._id,
    email:request.body.email,
    nombre:request.body.nombre,
    estado:request.body.estado,
    rol:request.body.rol
    
  }
  if(post.email == undefined || post.email == null || post.email == "") {
    response.json({state:true, mensaje:" El campo email es obligatorio", campo:"email"})
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
  if(post.rol == undefined || post.rol == null || post.rol == "") {
    response.json({state:true, mensaje:" El campo rol es obligatorio", campo:"rol"})
    return false
  }
  
  
  

  usuariosmo.update(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se actualizo correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al actualizar", error:respuesta})
    }

  })

  
}

usuarios.delete=function(request,response){
  var post={
    _id:request.body._id
    
  }
  
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo id es obligatorio", campo:"_id"})
    return false
  }


  usuariosmo.delete(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se elimino correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al eliminar", error:respuesta})
    }

  })

  
}
usuarios.login=function(request,response){
  
  var post={
    email: request.body.email,
    password: request.body.password
        
  }
    
  if(post.email == undefined || post.email == null || post.email == "") {
    response.json({state:true, mensaje:" El campo email es obligatorio", campo:"email"})
    return false
  }
  if(post.password == undefined || post.password == null || post.password == "") {
    response.json({state:true, mensaje:" El campo password es obligatorio", campo:"password"})
    return false
  }
  
  post.password = sha256(post.password + config.passsha256)
    
 
  usuariosmo.login(post,function(respuesta){
    console.log(respuesta.data.length)

    if(respuesta.state == true){
      if(respuesta.state == true){
      response.json({state:false, mensaje:"Errror en las credenciales de acceso"})
      }else{
      response.json({state:true, mensaje:"Bienvenido" + respuesta.data[0].nombre})
      }
    }else{
      response.json({state: false,mensaje: "Error en las credenciales de Acceso"})
    }
  })
  
  
    
}
usuarios.miusuario=function(request,response){
  var post={
    _id: request.body._id
    
  }
  if(post._id == undefined || post._id == null || post._id == "") {
    response.json({state:true, mensaje:" El campo _id es obligatorio", campo:"_id"})
    return false
  }
  usuariosmo.listarid(post,function(respuesta){
    response.json(respuesta)
  })
}

usuarios.actualizarpass=function(request,response){
  var post={
    _id:request.session._id,
    password:request.body.password,
        
  }
  if(post.password == undefined || post.password == null || post.password == "") {
    response.json({state:true, mensaje:" El campo password es obligatorio", campo:"password"})
    return false
  }
  post.password= sha256(post.password + config.passsha256)
  usuariosmo.actualizarpass(post, function(respuesta){
    if(respuesta.state == true){
      response.json({state:true, mensaje:" Se actualizo correctanente"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Se presento un error al actualizar", error:respuesta})
    }

  })
}

usuarios.activar=function(request,response){
 
  var post={
    
    email:request.body.email,
    codigoact:request.body.codigoact
    
    
  }
  if(post.email == undefined || post.email == null || post.email == "") {
    response.json({state:true, mensaje:" El campo email es obligatorio", campo:"email"})
    return false
  }
  if(post.codigoact == undefined || post.codigoact == null || post.codigoact == "") {
    response.json({state:true, mensaje:" El campo codigoact es obligatorio", campo:"codigoact"})
    return false
  }
 
  usuariosmo.activar(post, function(respuesta){
    if(respuesta.respuesta && respuesta.respuesta.affectedCount ==0 ){
      response.json({state:false, mensaje:" Sus credenciales de activacion son invalidas"})
      return false
    }
    else{
     response.json({state:true, mensaje:" Su cuenta se activo correctamente"})
    }

  })

  
}

  





module.exports.usuarios=usuarios