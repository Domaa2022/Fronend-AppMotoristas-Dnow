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