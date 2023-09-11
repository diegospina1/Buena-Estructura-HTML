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
    celPhone:false,
    politica: false
}

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
});

form.addEventListener('change', (e) => {
    const input = e.target.id;
    console.log(input) 
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
