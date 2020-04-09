const presupuestoUsuario = prompt('Cual es tu presupuesto para esta semana?');
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');

//clase de presupuesto
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto),
        this.restante = Number(presupuesto)

    };
    //metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }


};


//clase de interfaz para manejar el HTML

class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');


        //insertar al HTML
        presupuestoSpan.innerHTML = cantidad;
        restanteSpan.innerHTML = cantidad
        
    }

    imprimirMensaje(msj, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert')
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(msj));

        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //sacar el error
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();

        },3000);
    }

    agregarGastoListado(nombre, cantidad){
        const gastoListado = document.querySelector('#gastos ul');


        //creamos un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        //insertar el gasto
        li.innerHTML = `
        ${nombre}
        <span class = "badge badge-primary badge-pill"> $${cantidad} </span>
        `;

        //insertar al html
        gastoListado.appendChild(li);
    }

    //comprueba presupuesto restante
    presupuestoRestante(gasto){
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(gasto);
        if(presupuestoRestanteUsuario>=0){
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        }else{
            alert('Ya no tienes dinero disponible');
        }
    }
}










document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario ==='' ){
        window.location.reload()
    }else{
       cantidadPresupuesto  = new Presupuesto(presupuestoUsuario);
        //instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    };
});

formulario.addEventListener('submit', function(e){

    e.preventDefault();

    //leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;


    //instanciar la interfaz
    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto ==='' ){
        //parametros mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error')
    }else{
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }




})