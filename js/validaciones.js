export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--valid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",

];

const mensajesDeError = {
    nombre: {
     valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "Al menos 6 caracteres, maximo 12 , debe contener .."
    },
    nacimiento:
    {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Dbees tener al menos 18 years old"
    },
    numero : {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXXXX 10 numeroa "
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    },






}
const validadores = {
    nacimiento: (input) =>  validarNacimiento(input),
};

const inputNacimiento = document.querySelector('#birth');
inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target)
    console.log()


});

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity(error)){
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje =  mensajesDeError[tipoDeInput]
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 years old";

    };

    input.setCostumValidity(mensaje);

}
function mayorDeEdad(fecha) {

    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCFullDate()
        );
        return diferenciaFechas <= fechaActual;
};