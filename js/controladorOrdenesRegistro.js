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
