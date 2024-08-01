var soloadmo = function(request,response){
    var rol= request.session.rol
    if(rol == 1){
        next()

    }else{
        response.json({permisos:true,state:false, mensaje: " Solo Administradores"})
    }
}
var solologiados = function(request,response,next){
    if(request.session._id != undefined){
        next()
    }
    else{
        response.json({permisos:true,state:false, mensaje:"Dede inciar sesion"})
    }

}

var categorias = require ("./api/Controladores/Categorias.js").categorias;

app.post("/categorias/save", function(request, response){
    categorias.save(request,response)

})

app.post("/categorias/listar", function(request,response){
    categorias.listar(request,response)

})

app.post("/categorias/listarid", function(request,response){
    categorias.listarid(request,response)

})


app.post("/categorias/update", function(request,response){
    categorias.update(request,response)

})

app.post("/categorias/delete", function(request,response){
    categorias.delete(request,response)

})


var productos = require ("./api/Controladores/productos.js").productos;


app.post("/productos/save",  function(request, response){
    productos.save(request,response)

})

app.post("/productos/listar", function(request,response){
    productos.listar(request,response)

})

app.post("/productos/listarid",  function(request,response){
    productos.listarid(request,response)

})

app.post("/productos/update",  function(request,response){
    productos.update(request,response)

})

app.post("/productos/delete",  function(request,response){
    productos.delete(request,response)

})

var usuarios = require ("./api/Controladores/Usuarios.js").usuarios;


app.post("/usuarios/save", function(request, response){
    usuarios.save(request,response)

})

app.post("/usuarios/listar", function(request,response){
    usuarios.listar(request,response)

})

app.post("/usuarios/listarid", function(request,response){
    usuarios.listarid(request,response)

})

app.post("/usuarios/update", function(request,response){
    usuarios.update(request,response)

})

app.post("/usuarios/delete", function(request,response){
    usuarios.delete(request,response)

})
app.post("/usuarios/login", function(request,response){
    usuarios.login(request,response)

})
app.post("/usuarios/activar", function(request,response){
    usuarios.activar(request,response)

})
app.post("/usuarios/state", function(request,response){
    response.json(request.session)

})
app.post("/usuarios/actualizarpass", function(request,response){
    usuarios.actulizarpass(request.session)

})
app.post("/usuarios/miusuario", function(request,response){
    usuarios.miusuario(request.session)

})

app.post("/usuarios/loguot", function(request,response){
    request.session.destroy()
    response.json({state:true, mensaje:"Session Cerrada"})

})








