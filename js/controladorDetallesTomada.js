var ordenSolicitad = JSON.parse(sessionStorage.getItem('orden'));
console.log(ordenSolicitad)
var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));
console.log(motoristaActivo)


var producto = [];





function usuario (){
    axios({
        url : 'http://localhost:3000/motoristas/' ,
        method : 'get',
        ResponseType : 'json'
    })
    .then((res)=>{
        x = res.data
        for (let i = 0; i < x.length; i++) {
            if(x[i].correo == motoristaActivo.correo){
                document.getElementById('DetallesOrdenes').innerHTML += `
                <h3>Detalles Orden # ${x[i].ordenesPendientes[0].numeroPedido}</h3>
                `

                
                document.getElementById('informacion').innerHTML =
                    `
                    <h1>Pedido #${x[i].ordenesPendientes[0].numeroPedido}  </h1>
                    <h3>Lugar entrega:</h3>
                    <h3>latitud : 14.086703507968087 </h3>
                    <h3>longitud : -87.16791013757324</h3>
                    `
            }
        }
        
        
    })
    .catch(err => {console.log(err)})
}

usuario();


function generarDetalle (){
    axios({
        url : 'http://localhost:3000/motoristas/' ,
        method : 'get',
        ResponseType : 'json'
    })
    .then((res)=>{
        var x= res.data
        for (let i = 0; i < x.length; i++) {
            if(x[i].correo == motoristaActivo.correo){
                for (let j = 0 ; j < x[i].ordenesPendientes[0].productos.length;j++){
                    producto += `
                    <h3>${x[i].ordenesPendientes[0].productos[j].nombreProducto},</h3>
                    <div class="cant">
                    <h3>cantidad: ${x[i].ordenesPendientes[0].productos[j].cantidad} </h3>
                    <h3>$${x[i].ordenesPendientes[0].productos[j].precio}</h3>
                    </div class="detalles2">`
                }
                

            }
            
        }

        for (let i = 0; i < x.length; i++) {
            if(x[i].correo == motoristaActivo.correo){
                document.getElementById('cont').innerHTML += `
                    ${producto}
                    `
            }
            
        }
    }).catch(err => {
        console.log(err)
    })
}

generarDetalle();