var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));
console.log(motoristaActivo)

if(motoristaActivo.ordenesPendientes.length > 0){
    var ordenSolicitad = motoristaActivo.ordenesPendientes[0]
}else{
    var ordenSolicitad = JSON.parse(sessionStorage.getItem('orden'));
    console.log(ordenSolicitad)
}







function iniciarMapa(LatitudCliente,LongitudCliente){
    var LatitudCliente = LatitudCliente;
    var LongitudCliente = LongitudCliente;
    var latitud = 14.083540
    var longitud = -87.166966

    coordenadas = {
        lng : longitud,
        lat : latitud
    }

    generarMapa(coordenadas,LatitudCliente,LongitudCliente)

}

function generarMapa(coordenadas,LatitudCliente,LongitudCliente) {
    var mapa = new google.maps.Map(document.getElementById('maps'),
    {
        zoom: 15,
        center : new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
    });

    marcador = new google.maps.Marker({
        map: mapa,
        position: new google.maps.LatLng(LatitudCliente, LongitudCliente)
    });

    beachMarker = new google.maps.Marker({
        position: new google.maps.LatLng(14.073540, -87.166966),
        map: mapa,
        icon: '../MapsColor/darkgreen_MarkerA.png'
    });
}

function enviarUbicacion() {
    let coordenadas = {
        latitud : document.getElementById("latitud").value,
        longitud: document.getElementById("longitud").value
    }

}

function cambiarEstado(){
    location.href="../html/ubicacion.html"
    
}

function enOrigen(){
    var orden = "En Origen"
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

    })
}

function enCamino(){
    var orden = "En Camino"
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

    })
}

function enDestino(){
    var disponible = "disponible"
    var motoristaEntrega = {
        recibe : motoristaActivo.nombreMotorista,
        correo : motoristaActivo.correo,
        correoMotorista: motoristaActivo.correo,
        numeroPedido : ordenSolicitad.numeroPedido,
        usuario : ordenSolicitad.usuario,
        productos: ordenSolicitad.productos,
    }
    axios ( {
        url :'http://localhost:3000/motoristas/' + motoristaActivo._id + '/entregado/' + disponible ,
        method : 'put',
        responseType : 'json',
        data : motoristaEntrega

    }).then( res => {
        var funcion = true
        if(funcion == true){
            location.href="../html/inicio.html"
        }
    }).catch( err => {
        console.log(err)
    })
}

