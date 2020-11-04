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

async function loadPokemons() {
    document.getElementById('loader').classList.remove("hidden");
    try {
        const data = await fetchData(URL_TO_FETCH);
        pokemonArray = pokemonArray.concat(data.results);
        renderPokemons();
    } catch(error) {
        console.log(error);
    }
}

async function renderPokemons() {
    let pokemons = pokemonArray.slice(30*calls, 30 + 30*calls);
    calls++;
    try {
        const data = await getPokemons(pokemons);
        showPokemons(data);
    } catch(error) {
        console.log(error);
    }
}

async function showSearchedPokemons(pokemons) {
    calls = 0;
    window.removeEventListener('scroll', infiniteScroll);
    try {
        const data = await getPokemons(pokemons);
    showPokemons(data);
    } catch(error) {
        console.log(error);
    }
}

async function storePokemonArray(id) {
    const pokemon = await fetchData(pokemonArray[id].url)
    try {
        window.localStorage.setItem('pokemon', JSON.stringify(pokemon));
        document.location.pathname = 'src/pages/pokemon/pokemon.html';
    } catch(error) {
        console.log(error); 
    } 
    
}