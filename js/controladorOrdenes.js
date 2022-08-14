var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));
var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));

function generarOrdenes(){
    axios({
            url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
            method : 'get',
            ResponseType : 'json'
        }).then((res)=>{
            x= res.data.ordenes
    
            console.log(res.data)
    
            if(x.length >= 1){
                let precioPedido = 0
                let ISV = 0
                let precioTotal = 0
    
                document.getElementById('ordenes').innerHTML = ""
                `  <h3>Detalles Orden  #${x[i]._id}</h3>`
                for(let i = 0; i < x.length; i++){
                    document.getElementById('ordenes').innerHTML +=
                    `
                    <div class ="product">
                    <img src="${[i].imagenProducto}" class="imgRedondaPopular" alt="">
                    <div>
                        <p class="textopopular">${x[i].nombreProducto}</p>
                        <p class="textopopular">${x[i].descripcion}</p>
                        <p class="textopopular">Cantidad: ${x[i].cantidad}</p>
                    </div>
                    <div class ="precio">
                        <p class ="textopopular" class="precio">${x[i].precio}</p>
                        
                    </div>
                </div>

                    `
                    precioPedido = precioPedido + x[i].precio
    
                }
                
                    
                    
                    
                
    
                ISV = ISV + (precioPedido * 0.15)
                precioTotal = precioTotal + (precioPedido + ISV)
    
                {
                    document.getElementById('totalPedido').innerHTML = `
                    <div  class="flex" style="justify-content: space-between ;">
                    <p class="textoCarritoProcesar">Sub total </p>
                    <p class="textoCarritoProcesar"> $${precioPedido}</p>
                    </div>
                    <div class="flex" style="justify-content: space-between ;">
                        <p class="textoCarritoProcesar">ISV</p>
                        <p class="textoCarritoProcesar"> $${ISV} </p>
                    </div>
                    <div class="flex" style="justify-content: space-between ;">
                        <p class="textoCarritoProcesar">Total </p>
                        <p class="textoCarritoProcesar"> $${precioTotal}</p>
                    </div>
                    `
                }
    
            }else{
                document.getElementById('botonProcesar').style.display = 'none'
            }
            
           


        }).catch(err => {
            console.log(err)
        })
    }
    
    generarOrdenes();

    axios({
        url : 'http://localhost:3000/motoristas',
        method : 'get',
        data : ordenes,
        ResponseType : 'json'
    }).then(res => {
        console.log(res.data)
    });

    