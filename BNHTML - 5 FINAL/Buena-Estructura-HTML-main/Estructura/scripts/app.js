    'use strict';

const buscando = document.getElementById('buscando');
const inputBuscar = document.getElementById('input_buscar');
const listado = document.getElementById('listprice');
const tem = document.getElementById('template').content;
const fragment = new DocumentFragment();
const btnEnviar = document.getElementById('btnSend');
const form = document.getElementById('form');

//Objeto validación

const formValid = {
    nombre: false,
    apellidos: false,
    mail: false,
    celPhone:true,
    politica: true
}

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    if(validInputsForm(formValid) === -1){
        alert("Enviando formulario");
    }
    else{
        alert("Campos invalidos");
    }
});

const validInputsForm = (objeto) =>{
    const values = Object.values(objeto);
    let response = values.findIndex(e=>e === false);
    return response;
}

form.addEventListener('change', (e) => {
    const inputId = e.target.id;
    console.log(inputId);
    const valueInput = e.target.value;
    console.log(valueInput); 
    const classInput = e.target.classList;
    console.log(classInput);
    //Funciones para agregar estilos y quitar estilos
    const isValidClass = () => {
        classInput.add("is-valid");
        classInput.remove("is-invalid");
    }
    const isInvalidClass = () => {
        classInput.add("is-invalid");
        classInput.remove("is-valid");
    };
    switch(inputId){
        case "names":
            const nombresRx = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
            formValid.nombre = valueInput.match(nombresRx) ? true : false;
            formValid.nombre ? isValidClass() : isInvalidClass(); 
            console.log(Object.values(formValid));
            break;
        case "lastNames":
            const apellidosRx = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
            formValid.apellidos = valueInput.match(apellidosRx) ? true : false;
            formValid.apellidos ? isValidClass() : isInvalidClass(); 
            console.log(Object.values(formValid));
            break;
        case "mail":
            const mailRx = /^([\w.]+[^#$%&\/()='"!?¡]\w*-*)([@])(\w)+(\.[a-z]{2,3})$/g;
            formValid.mail = valueInput.match(mailRx) ? true : false;
            formValid.mail ? isValidClass() : isInvalidClass();
            console.log(Object.values(formValid));
            break;
    }
});






buscando.addEventListener('click', (e)=>{
    if(inputBuscar.classList.contains('buscarOculto')){
        inputBuscar.classList.remove('buscarOculto');
        inputBuscar.classList.add('buscarVisible');

    }
    else if(inputBuscar.classList.contains('buscarVisible')){
        inputBuscar.classList.remove('buscarVisible');
        inputBuscar.classList.add('buscarOculto');

    }
});

async function obtenerLista(){
    const respuesta = await axios
                        .get("https://pokeapi.co/api/v2/pokemon")
                        .then((response) =>{
                            const resultado = response.data.results;
                            let poke = [];
                            for (const i in resultado){
                                poke.push(resultado[i]);
                            }

                            //console.log(poke);
                            return poke;
                        })
                        .catch((error) =>{
                            console.log(error);
                            return 0;
                        });
    return respuesta;

}

const data = await obtenerLista();
//console.log(data);

const comprobarTem = "content" in document.createElement("template");
if(comprobarTem){
    data.forEach(element =>{
        tem.querySelector('#code').innerHTML = ` Código ${element.name}`;
        tem.querySelector('a').innerHTML = ` ${element.url}`;
        const myElement = tem.cloneNode(true);
        fragment.appendChild(myElement);
    });
}
listado.appendChild(fragment);
