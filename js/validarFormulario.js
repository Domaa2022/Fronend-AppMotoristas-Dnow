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
   Direccion: false,
   Matricula: false

}

const campoInicioSesion ={
	MotoristaRegistrado: false ,
	ContraseñaRegistrada: false,
}


const validarFormularioRegistro = (e) => {
	switch (e.target.name) {
		case "usuarionuevo":
			validarCampoRegistro(expresiones.usuario, e.target, "Usuario");
			break;
		case "contraseñanueva":
			validarCampoRegistro(expresiones.password, e.target, "Contraseña");
			break;
		case "emailnuevo":
			validarCampoRegistro(expresiones.correo, e.target, "Correo");
			break;
		case "direccionnueva":
         validarCampoRegistro(expresiones.usuario, e.target, "Dirección")
		   break;
      case "matriculanueva":
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


formularioRegistro.addEventListener('submit', (e) =>{
    e.preventDefault();
    });


   function Ingresar() {
	var motorista = document.getElementById('motorista').value
	var contraseña = document.getElementById('contraseña').value
	var usuarioIngresado = false


	axios({
		url : 'http://localhost:3000/motoristas',
		method : 'get',
		ResponseType : 'json'
	}).then(res => {
		(res.data).forEach( e => {
			if(e.correo == usuario && e.contraseña == contraseña){
				window.location.href = './html/index.html'
				sessionStorage.setItem('motorista', JSON.stringify(e))
				usuarioIngresado = true
			}
		});
		if(!usuarioIngresado){
		document.getElementById('errorInicio').style.display = "block";
		document.getElementById('errorInicio').innerHTML = '<p class="texto" style="color:red ;"> usuario o contraseña incorrecta  </p>' }

	}).catch(err => {
		console.log(err)
	})
}


