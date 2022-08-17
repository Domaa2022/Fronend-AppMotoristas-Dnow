var ordenSolicitad = JSON.parse(sessionStorage.getItem('orden'));
console.log(ordenSolicitad)
var producto = [];


document.getElementById('numeroOrden').innerHTML = `<h3>Detalles Orden  #${ordenSolicitad.numeroPedido}</h3>`





function generarProductos (){
    axios({
        url : 'http://localhost:3000/usuarios/ordenes' ,
        method : 'get',
        ResponseType : 'json'
    })
    .then((res)=>{

        for(var i=0; i<ordenSolicitad.productos.length; i++){
            producto += `
            <div class ="product">
                    <img src="${ordenSolicitad.productos[i].imagen}" class="imgRedondaPopular" alt="">
                    <p class="textopopular">${ordenSolicitad.productos[i].nombreProducto}</p>
                    <div class ="precio">
                        <p class ="textopopular" class="precio">$ ${ordenSolicitad.productos[i].precio}</p>
                        <p class ="textopopular" class="precio">Cantidad: ${ordenSolicitad.productos[i].cantidad}</p>
                    </div>
                </div>`
        }
        
        var x = res.data
        for (let i = 0; i < x.length; i++) {
            for( let j = 0 ; j<x[i].pedidos.length; j++){
                if(x[i].pedidos[j].numeroPedido == ordenSolicitad.numeroPedido){
                    document.getElementById('productosGenerados').innerHTML += `
                    ${producto}
                    `
                }
            }
            
        }
    })
    .catch(err => {
        console.log(err)
    })
}

generarProductos();


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
