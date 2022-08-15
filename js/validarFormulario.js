const formularioRegistro = document.getElementById('formulario');
const formularioInicioSesion = document.getElementById('formularioInicioSesion');
const inputsRegistro = document.querySelectorAll('#formulario input');
const inputsInicioSesion = document.querySelectorAll('#formularioInicioSesion input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	placa:/^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo

}

const campoRegistro ={
	motorista: false ,
	Contraseña: false,
	Correo: false,
   direccion: false,
   matricula: false

}

const campoInicioSesion ={
	MotoristaRegistrado: false ,
	ContraseñaRegistrada: false,
}


const validarFormularioRegistro = (e) => {
	switch (e.target.name) {
		case "usuarioNuevo":
			validarCampoRegistro(expresiones.motorista, e.target, "Usuario");
			break;
		case "contraseñaNuevo":
			validarCampoRegistro(expresiones.password, e.target, "Contraseña");
			break;
		case "email":
			validarCampoRegistro(expresiones.correo, e.target, "Correo");
			break;
		case "direccion":
         validarCampoRegistro(expresiones.direccion, e.target, "Dirección")
		   break;
      case "placa":
         validarCampoRegistro(expresiones.placa, e.target, "Matricula")
         default:
         break;
	}
}

inputsRegistro.forEach(input => {

	input.addEventListener('keyup', validarFormularioRegistro);
	input.addEventListener('blur', validarFormularioRegistro);

})

const validarCampoRegistro = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo${campo}`).classList.remove('formularioGrupo-incorrecto');
		campoRegistro[campo] = true;
	}else{
		document.getElementById(`grupo${campo}`).classList.add('formularioGrupo-incorrecto');
		campoRegistro[campo] = false;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo${campo}`).classList.remove('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = true;
	}else{
		document.getElementById(`grupo${campo}`).classList.add('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = false;
	}
}





function Ingresar() {
	var usuario = document.getElementById('motorista').value
	var contraseña = document.getElementById('contraseña').value
	var usuarioIngresado = false


	axios({
		url : 'http://localhost:3000/motoristas',
		method : 'get',
		ResponseType : 'json'
	}).then(res => {
		(res.data).forEach( e => {
			if (e.estado == "pendiente"){
				alert("Esperando aceptacion de usuario")
			}else{
				alert("Estas registrado")
				if(e.nombreMotorista == usuario && e.contraseña == contraseña){
					window.location.href = 'html/inicio.html'
					sessionStorage.setItem('motorista', JSON.stringify(e))
					usuarioIngresado = true
				}

			}

			
		});
		if(!usuarioIngresado){
		document.getElementById('errorInicio').style.display = "block";
		document.getElementById('errorInicio').innerHTML = '<p class="texto" style="color:red ;"> usuario o contraseña incorrecta  </p>' }
	}).catch(err => {
		console.log(err)
	})
}

function nuevoMotorista(){
	var usuario = document.getElementById('usuarioNuevo').value
	var contraseña = document.getElementById('contraseñaNuevo').value
	var correo = document.getElementById('email').value
	var matricula = document.getElementById('placa').value
	

	let motoristaNuevo =
	{
		nombreMotorista: usuario,
		correo: correo,
		contraseña: contraseña,
		latitud: "",
		longitud: "",
		estado: "pendiente",
		matricula: matricula,
		ordenesPendientes: [],
		ordenesFinalizadas: [],
		
	
	}

	axios({
		url : 'http://localhost:3000/motoristas',
		method : 'post',
		data : motoristaNuevo,
		ResponseType : 'json'
	}).then(res => {
		console.log(res.data)
		alert("Usuario creado esperando a ser aceptado");
	}).catch(err => {
		console.log(err)
	}
	)
}

function Registro(){
	location.href = 'html/registro.html'
}


