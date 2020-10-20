let calls = 0;

let URL_TO_FETCH = "https://pokeapi.co/api/v2/pokemon?limit=30";

let pokemonArray = [];

const badgeUrl = "https://raw.githubusercontent.com/vinicoder/pokedex/9a20a03d88361a15b20b450e8933b79e9f175259/src/assets/icons/types/";
const spriteUrl = "https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/";

function showPokemons(data) {
    const pokemonList = data.map(pokemon => {
            return `<li>
            <a onclick="storePokemonArray(${pokemon.id})" href="../pokemon/pokemon.html" class="card" style="background:${types.find(type => type.name == pokemon.types[0].type.name).card}">
            <div class="pokemon-info">
                <span class="pokemon-number">
                #${makeId(pokemon.id, 3)}
                </span>
                <span class="pokemon-name">
                ${capitalizeFirstLetter(pokemon.name)}
                </span>
                <ul class="pokemon-type">
                <li class="badge" style="background:${types.find(type => type.name == pokemon.types[0].type.name).color}">
                    <img src="${badgeUrl + capitalizeFirstLetter(pokemon.types[0].type.name)}.svg" 
                    alt="${pokemon.types[0].type.name}">
                    ${capitalizeFirstLetter(pokemon.types[0].type.name)}
                </li>` +
                (pokemon.types[1] ? `
                <li class="badge" style="background:${types.find(type => type.name == pokemon.types[1].type.name).color}">
                    <img src="${badgeUrl + capitalizeFirstLetter(pokemon.types[1].type.name)}.svg" 
                    alt="${pokemon.types[1].type.name}">
                    ${capitalizeFirstLetter(pokemon.types[1].type.name)}
                </li>` 
                : "") +
                `
                </ul>
            </div>
                <img src="${spriteUrl + (pokemon.id)}.svg">
            </a>
        </li>
        `;
    })
    .join("");
    console.log(pokemonList);
    document.querySelector("#pokemon-list")
    .insertAdjacentHTML("beforeend", pokemonList);
}

function loadPokemons() {
    calls++;
    fetchData(URL_TO_FETCH).then(data => {
        pokemonArray = [...pokemonArray, ...data];
        showPokemons(data)
    })
    .catch(error => {
        console.log(error)
    })
    document.getElementById('loader').style.display = 'none';
}

window.onscroll = function() {
    document.getElementById('loader').style.display = 'flex';

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadPokemons();
        document.getElementById('loader').style.display = 'none';
    }
};


function makeId(id, length) {
    var len = length - (''+ id).length;
    return (len > 0 ? new Array(++len).join('0') : '') + id;
}  

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function storePokemonArray(id) {
    window.localStorage.setItem('pokemons', JSON.stringify(pokemonArray[id - 1]));
}

const types = [
    {name: "normal", color: '#A8A77A', card: '#8a8969'},
    {name: "fire", color: '#EE8130', card: '#f28e49'},
    {name: "water", color: '#6390F0', card: '#739df5'},
	{name: "electric", color: '#F7D02C', card: '#c9a410'},
	{name: "grass", color: '#7AC74C', card: '#63a163'},
	{name: "ice", color: '#96D9D6', card: '#75c7c3'},
	{name: "fighting", color: '#C22E28', card: '#8f4542'},
	{name: "poison", color: '#A33EA1', card: '#a865a7'},
	{name: "ground", color: '#E2BF65', card: '#a18b54'},
	{name: "flying", color: '#A98FF3', card: '#bba6f5'},
	{name: "psychic", color: '#F95587', card: '#c75b7c'},
	{name: "bug", color: '#A6B91A', card: '#798714'},
	{name: "rock", color: '#B6A136', card: '#85762e'},
	{name: "ghost", color: '#735797', card: '#7a6791'},
	{name: "dragon", color: '#6F35FC', card: '#4923a6'},
	{name: "dark", color: '#705746', card: '#665e58'},
	{name: "steel", color: '#B7B7CE', card: '#8e8ea3'},
	{name: "fairy", color: '#D685AD', card: '#deb8cb'},
]