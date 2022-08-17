
var motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'));

function inicio(){
    axios({
        url : 'http://localhost:3000/motoristas/' + motoristaActivo._id,
        method : 'get',
        ResponseType : 'json'
    }).then( res => {
        if(res.data.ordenesPendientes.length > 0){
            alert("Tienes ordenes pendientes")
        }else{
            generarOrdenesDisponibles();
        }

    }).catch( err => {
        console.log(err)
    })

}

inicio();


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


    