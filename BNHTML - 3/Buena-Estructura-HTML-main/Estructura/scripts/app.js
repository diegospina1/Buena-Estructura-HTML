'use strict';

const buscando = document.getElementById('buscando');
const inputBuscar = document.getElementById('input_buscar');
const listado = document.getElementById('listprice');
const tem = document.getElementById('template').content;
const fragment = new DocumentFragment();
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
