let URL_TO_FETCH = "https://pokeapi.co/api/v2/pokemon?limit=1050";

let pokemonArray = [];
let searchedPokemons = [];

let calls = 0;

function showPokemons(data) {
    const pokemonList = data.map(pokemon => createCard(pokemon)).join("");
    document.querySelector("#pokemon-list")
    .insertAdjacentHTML("beforeend", pokemonList);
    document.getElementById("loader").classList.add('hidden');
}

function loadPokemons() {
    document.getElementById('loader').classList.remove("hidden");
    fetchData(URL_TO_FETCH).then(data => {
        pokemonArray = pokemonArray.concat(data.results);
        renderPokemons();
    })
    .catch(error => {
        console.log(error);
    })
}

function renderPokemons() {
    let pokemons = pokemonArray.slice(30*calls, 30 + 30*calls);
    calls++;
    getPokemons(pokemons).then(data => showPokemons(data));
}

function showSearchedPokemons(pokemons) {
    calls = 0;
    window.removeEventListener('scroll', infiniteScroll);
    getPokemons(pokemons).then(data => showPokemons(data));
}

function storePokemonArray(id) {
    fetchData(pokemonArray[id - 1].url)
        .then(pokemon => window.localStorage.setItem('pokemon', JSON.stringify(pokemon)))
        .catch(error => console.log(error));
    
}