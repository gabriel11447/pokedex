let URL_TO_FETCH = "https://pokeapi.co/api/v2/pokemon?limit=1050";

let pokemonArray = [];
let searchedPokemon = [];

let flagSearch = 0;

function showPokemons(data) {
    const pokemonList = data.map(pokemon => createCard(pokemon)).join("");
    document.querySelector("#pokemon-list")
    .insertAdjacentHTML("beforeend", pokemonList);
}

function loadPokemons() {
    document.getElementById('loader').classList.remove("hidden");
    fetchData(URL_TO_FETCH).then(data => {
        pokemonArray = [...pokemonArray, ...data];
        showPokemons(data);
    })
    .catch(error => {
        console.log(error);
    })
}

function storePokemonArray(id) {
    if (pokemonArray[id - 1] != null) {
        window.localStorage.setItem('pokemon', JSON.stringify(pokemonArray[id - 1]));
    } else {
        window.localStorage.setItem('pokemon', JSON.stringify(searchedPokemon[0]));
    }
}