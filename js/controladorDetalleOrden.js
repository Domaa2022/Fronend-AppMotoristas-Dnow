var ordenSolicitad = JSON.parse(sessionStorage.getItem('orden'));
console.log(ordenSolicitad)
var producto = [];


function usuario (){
    axios({
        url : 'http://localhost:3000/usuarios' ,
        method : 'get',
        ResponseType : 'json'
    })
    .then((res)=>{
        document.getElementById('DetallesOrdenes').innerHTML += `
        <h3>Detalles Orden # ${ordenSolicitad.numeroPedido}</h3>
        `
        var x= res.data
        for (let i = 0; i < x.length; i++) {
            if(x[i].nombre == ordenSolicitad.usuario){
            document.getElementById('detallesPedidom').innerHTML =
                `
                <h1>Pedido #${ordenSolicitad.numeroPedido}</h1>
                <h3>Lugar entrega:</h3>
                <h3>latitud : ${x[i].latitud} </h3>
                <h3>longitud :${x[i].longitud}</h3>
                `
            }
        }
        
    })
    .catch(err => {console.log(err)})
}

usuario();







function generarDetalle (){
    axios({
        url : 'http://localhost:3000/usuarios/ordenes' ,
        method : 'get',
        ResponseType : 'json'
    })
    .then((res)=>{
        for(var i=0; i<ordenSolicitad.productos.length; i++){
            producto += `
            <h3>${ordenSolicitad.productos[i].nombreProducto},</h3>
                <div class="cant">
                    <h3>cantidad: ${ordenSolicitad.productos[i].cantidad}</h3>
                    <h3>$${ordenSolicitad.productos[i].precio}</h3>
                </div class="detalles2">`
        }
        var x = res.data
        for (let i = 0; i < x.length; i++) {
            for( let j = 0 ; j<x[i].pedidos.length; j++){
                if(x[i].pedidos[j].numeroPedido == ordenSolicitad.numeroPedido){
                    document.getElementById('cont').innerHTML += `
                    ${producto}
                    `
                }
            }
            
        }
    }).catch(err => {
        console.log(err)
    })
}

generarDetalle();


function OrdenTomada(){
    var disponible = "ocupado"
    var motoristaEntrega = {
        recibe : motoristaActivo.nombreMotorista,
        correo : motoristaActivo.correo,
        correoMotorista: motoristaActivo.correo,
        numeroPedido : ordenSolicitad.numeroPedido,
        usuario : ordenSolicitad.usuario,
        productos: ordenSolicitad.productos,
        isv: ordenSolicitad.ISV,
        total: ordenSolicitad.precioTotal,
    }
    axios ( {
        url :'http://localhost:3000/motoristas/' + motoristaActivo._id + '/' + disponible ,
        method : 'put',
        responseType : 'json',
        data : motoristaEntrega

    }).then( res => {
        console.log(res.data)
    }).catch( err => {
        console.log(err)
    })




    
    var orden = "Tomada"
    var motoristaEntrega = {
        recibe : motoristaActivo.nombreMotorista,
        correo : motoristaActivo.correo,
    }
    axios ( {
        url :'http://localhost:3000/usuarios',
        method : 'get',
        responseType : 'json'
    })
    .then( res => {
        var x = res.data;
        console.log(ordenSolicitad.numeroPedido)
        
        
        for (let i = 0; i < x.length; i++) {
            if(x[i].nombre == ordenSolicitad.usuario){
                var LatitudCliente = x[i].latitud;
                var LongitudCliente = x[i].longitud;
                iniciarMapa(LatitudCliente,LongitudCliente)
                axios({
                    url: 'http://localhost:3000/usuarios/' + x[i]._id + "/" + ordenSolicitad.numeroPedido + "/" + orden, 
                    method: 'put',
                    responseType: 'json',
                    data: motoristaEntrega
                    
                }).then(res => {
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            }
            
        }
        
    })
    .catch( err => {

    }).finally(
        window.location.href = '../html/detallesTomada.html'
    )
}