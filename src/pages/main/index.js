let calls = 0;

let URL_TO_FETCH = "https://pokeapi.co/api/v2/pokemon?limit=30";

let pokemonArray = [];

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
                <img src="${spriteUrl + (pokemon.id)}.png">
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

function storePokemonArray(id) {
    window.localStorage.setItem('pokemons', JSON.stringify(pokemonArray[id - 1]));
}