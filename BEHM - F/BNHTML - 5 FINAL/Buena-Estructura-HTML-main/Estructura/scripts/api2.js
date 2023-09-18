axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
        const resultados = response.data;
        console.log(resultados)
    })
    .catch((e) => {
        console.log(error);
    })
    .finally(
        /*console.log("Termino la petición2")*/
    );