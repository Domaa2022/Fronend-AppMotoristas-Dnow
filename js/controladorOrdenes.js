
var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));

function generarOrdenesDisponibles(){
    axios({
            url : 'http://localhost:3000/usuarios' ,
            method : 'get',
            ResponseType : 'json'
        }).then((res)=>{
            var x= res.data

            document.getElementById('ordenes').innerHTML = ''; 
            for(var i=0; i<x.length; i++){

                for(var j = 0 ; j<x[i].pedidos.length; j++){
                    if( x[i].pedidos[j].Estado == "Pendiente"){
                        document.getElementById('ordenes').innerHTML += `
                        <input type="button" class="text3" value="Orden ${ x[i].pedidos[j].numeroPedido}" onclick="verOrden(${i},${j})"></input>`
                    }
                }

            }



        }).catch(err => {
            console.log(err)
        })
    }
    
    generarOrdenesDisponibles();

    function verOrden(i,j){
        axios({
            url : 'http://localhost:3000/usuarios' ,
            method : 'get',
            ResponseType : 'json'
        }).then((res)=>{
            var x= res.data
            sessionStorage.setItem('orden',JSON.stringify(x[i].pedidos[j]));
            location.href ="../html/detalles.html" 
            
        })
        
    }

    axios({
        url : 'http://localhost:3000/motoristas',
        method : 'get',
        data : ordenes,
        ResponseType : 'json'
    }).then(res => {
        console.log(res.data)
    });


    