var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));
console.log(motoristaActivo)


axios ({
    url: 'http://localhost:3000/motoristas/' + motoristaActivo._id,
    method: 'get',
    Responsetype: 'json'
}).then( res => {
    var x = res.data
    for (let i = 0; i < x.ordenesFinalizadas.length; i++) {
        document.getElementById('ordenesFinalizadas').innerHTML += `
        <input type="button" class="text3" value="Orden ${x.ordenesFinalizadas[i].numeroPedido}">`
        
    }
    for (let i = 0; i < x.ordenesPendientes.length; i++) {
        document.getElementById('ordenesPendientes').innerHTML += `
        <input type="button" class="text3" value="Orden ${x.ordenesPendientes[i].numeroPedido}">`
        
    }

}).catch( err => {
    console.log(err)
} )

function display(a){
    switch(a){
        case 1:
        location.href = "../html/disponibles.html"
        break;
        case 2:
            location.href = "../html/ordenes.html"
            break;
        case 3: 
            location.href = "../html/detallesTomada.html"
            break;
        case 4:
            location.href ="../html/inicio.html"
            break;
        case 5:
            location.href ="../html/detallesOrden.html"
            break;
        case 6:
            location.href="../html/detalles.html"
            break;
    }
}