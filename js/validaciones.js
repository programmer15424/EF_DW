document.addEventListener('DOMContentLoaded', function() {
    inicializarComponentes();
    configurarValidacionFormulario();
});

function inicializarComponentes() {
    const elementosCarrusel = document.querySelectorAll('.carousel');
    elementosCarrusel.forEach(function(elemento) {
        new bootstrap.Carousel(elemento, {
            interval: 5000,
            wrap: true
        });
    });
}

function configurarValidacionFormulario() {
    const formulario = document.getElementById('formularioContacto');
    
    if (!formulario) {
        return;
    }

    const campoNombre = document.getElementById('nombreCompleto');
    const campoCorreo = document.getElementById('correoElectronico');
    const campoTelefono = document.getElementById('telefono');
    const campoTipoConsulta = document.getElementById('tipoConsulta');
    const campoMensaje = document.getElementById('mensaje');
    const campoTerminos = document.getElementById('aceptoTerminos');

    campoNombre.addEventListener('blur', function() {
        validarNombre();
    });

    campoNombre.addEventListener('input', function() {
        if (campoNombre.classList.contains('is-invalid')) {
            validarNombre();
        }
    });

    campoCorreo.addEventListener('blur', function() {
        validarCorreo();
    });

    campoCorreo.addEventListener('input', function() {
        if (campoCorreo.classList.contains('is-invalid')) {
            validarCorreo();
        }
    });

    campoTelefono.addEventListener('blur', function() {
        validarTelefono();
    });

    campoTelefono.addEventListener('input', function() {
        if (campoTelefono.classList.contains('is-invalid')) {
            validarTelefono();
        }
    });

    campoTipoConsulta.addEventListener('change', function() {
        validarTipoConsulta();
    });

    campoMensaje.addEventListener('blur', function() {
        validarMensaje();
    });

    campoMensaje.addEventListener('input', function() {
        if (campoMensaje.classList.contains('is-invalid')) {
            validarMensaje();
        }
    });

    campoTerminos.addEventListener('change', function() {
        validarTerminos();
    });

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const nombreValido = validarNombre();
        const correoValido = validarCorreo();
        const telefonoValido = validarTelefono();
        const tipoConsultaValido = validarTipoConsulta();
        const mensajeValido = validarMensaje();
        const terminosValidos = validarTerminos();

        const formularioValido = nombreValido && correoValido && telefonoValido && 
                                tipoConsultaValido && mensajeValido && terminosValidos;

        if (formularioValido) {
            mostrarMensajeExito();
            setTimeout(function() {
                formulario.reset();
                limpiarValidaciones();
            }, 3000);
        } else {
            mostrarMensajeError();
        }
    });
}

function validarNombre() {
    const campo = document.getElementById('nombreCompleto');
    const valor = campo.value.trim();
    
    if (valor.length === 0) {
        marcarInvalido(campo);
        return false;
    }
    
    if (valor.length < 3) {
        marcarInvalido(campo);
        return false;
    }
    
    const expresionNombre = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
    if (!expresionNombre.test(valor)) {
        marcarInvalido(campo);
        return false;
    }
    
    marcarValido(campo);
    return true;
}

function validarCorreo() {
    const campo = document.getElementById('correoElectronico');
    const valor = campo.value.trim();
    
    if (valor.length === 0) {
        marcarInvalido(campo);
        return false;
    }
    
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionCorreo.test(valor)) {
        marcarInvalido(campo);
        return false;
    }
    
    marcarValido(campo);
    return true;
}

function validarTelefono() {
    const campo = document.getElementById('telefono');
    const valor = campo.value.trim();
    
    if (valor.length === 0) {
        marcarInvalido(campo);
        return false;
    }
    
    const expresionTelefono = /^[0-9]{9}$/;
    if (!expresionTelefono.test(valor)) {
        marcarInvalido(campo);
        return false;
    }
    
    marcarValido(campo);
    return true;
}

function validarTipoConsulta() {
    const campo = document.getElementById('tipoConsulta');
    const valor = campo.value;
    
    if (valor === '') {
        marcarInvalido(campo);
        return false;
    }
    
    marcarValido(campo);
    return true;
}

function validarMensaje() {
    const campo = document.getElementById('mensaje');
    const valor = campo.value.trim();
    
    if (valor.length === 0) {
        marcarInvalido(campo);
        return false;
    }
    
    if (valor.length < 20) {
        marcarInvalido(campo);
        return false;
    }
    
    marcarValido(campo);
    return true;
}

function validarTerminos() {
    const campo = document.getElementById('aceptoTerminos');
    const mensajeError = document.querySelector('.mensaje-error-terminos');
    
    if (!campo.checked) {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
        if (mensajeError) {
            mensajeError.style.display = 'block';
        }
        return false;
    }
    
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    if (mensajeError) {
        mensajeError.style.display = 'none';
    }
    return true;
}

function marcarInvalido(campo) {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
    campo.setAttribute('aria-invalid', 'true');
}

function marcarValido(campo) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    campo.setAttribute('aria-invalid', 'false');
}

function mostrarMensajeExito() {
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');
    
    mensajeError.classList.add('d-none');
    mensajeExito.classList.remove('d-none');
    
    mensajeExito.focus();
}

function mostrarMensajeError() {
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');
    
    mensajeExito.classList.add('d-none');
    mensajeError.classList.remove('d-none');
    
    mensajeError.focus();
}

function limpiarValidaciones() {
    const campos = document.querySelectorAll('.form-control, .form-select, .checkbox-terminos');
    campos.forEach(function(campo) {
        campo.classList.remove('is-valid', 'is-invalid');
        campo.removeAttribute('aria-invalid');
    });
    
    const mensajes = document.querySelectorAll('.alert, .mensaje-error-terminos');
    mensajes.forEach(function(mensaje) {
        if (mensaje.classList.contains('alert')) {
            mensaje.classList.add('d-none');
        } else {
            mensaje.style.display = 'none';
        }
    });
}
