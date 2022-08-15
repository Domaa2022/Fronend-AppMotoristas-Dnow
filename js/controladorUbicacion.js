var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));
console.log(clienteActivo)


function iniciarMapa(){
    var latitud = 14.083540
    var longitud = -87.166966

    coordenadas = {
        lng : longitud,
        lat : latitud
    }

    generarMapa(coordenadas)

}

function generarMapa(coordenadas) {
    var mapa = new google.maps.Map(document.getElementById('maps'),
    {
        zoom: 15,
        center : new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
    });

    marcador = new google.maps.Marker({
        map: mapa,
        draggable: true, 
        position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
    });

    marcador.addListener('dragend', function(event){
        document.getElementById('latitud').value = this.getPosition().lat();
        document.getElementById('longitud').value = this.getPosition().lng();
    })
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
    axios ( {
        url :'http://localhost:3000/motoristas/historialOrden/pedido',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('estado').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].pedidos.length ; j++){
                if(x[i].pedidos[j].estado == 'Pendiente'){
                    document.getElementById('estado').innerHTML += `              
                            <h3>Estado: ${x[i].pedidos[j].estado = 'en Origen'}</h3>
                
                    `  
                }
            }
        }   

    }).catch( err => {
        console.log(err);
    })
}

function enCamino(){
    axios ( {
        url :'http://localhost:3000/motoristas/historialOrden/pedido',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('estado').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].pedidos.length ; j++){
                if(x[i].pedidos[j].estado == 'en Origen'){
                    document.getElementById('estado').innerHTML += `              
                            <h3>Estado: ${x[i].pedidos[j].estado = 'en Camino'}</h3>
                
                    `  
                }
            }
        }   

    }).catch( err => {
        console.log(err);
    })
}

function enDestino(){
    axios ( {
        url :'http://localhost:3000/motoristas/historialOrden/pedido',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('estado').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].pedidos.length ; j++){
                if(x[i].pedidos[j].estado == 'en Camino'){
                    document.getElementById('estado').innerHTML += `              
                            <h3>Estado: ${x[i].pedidos[j].estado = 'en Destino'}</h3>
                
                    `  
                }
            }
        }   

    }).catch( err => {
        console.log(err);
    })
}

