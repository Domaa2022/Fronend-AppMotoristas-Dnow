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

motoristaActivo = JSON.parse(sessionStorage.getItem('motorista'))

function inicio(){
    document.getElementById('bienvenido').innerHTML =  `<h1>Bienvenido ${motoristaActivo.nombreMotorista}</h1>
        `
}
inicio()

function tomarOrden(){
   getElementbyid
}

function dirigirIndex(){
    location.href ="../index.html"
}