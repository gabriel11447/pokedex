let calls = 0;

let URL_TO_FETCH = "https://pokeapi.co/api/v2/pokemon?limit=30";

let pokemonArray = [];
let searchedPokemon = [];

let flagSearch = 0;

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
    document.querySelector("#pokemon-list")
    .insertAdjacentHTML("beforeend", pokemonList);
}

function loadPokemons() {
    calls++;
    document.getElementById('loader').classList.remove("hidden");
    fetchData(URL_TO_FETCH).then(data => {
        pokemonArray = [...pokemonArray, ...data];
        showPokemons(data);
    })
    .catch(error => {
        console.log(error);
    })
}

window.onscroll = function() {
    document.getElementById('loader').classList.remove("hidden");

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadPokemons();
        document.getElementById('loader').classList.add("hidden");
    }
};

function storePokemonArray(id) {
    if (pokemonArray[id - 1] != null) {
        window.localStorage.setItem('pokemon', JSON.stringify(pokemonArray[id - 1]));
    } else {
        window.localStorage.setItem('pokemon', JSON.stringify(searchedPokemon[0]));
    }
}

function removeSearchedPokemon() {
    const ul = document.getElementById("pokemon-list");
    const lis = ul.querySelectorAll('#pokemon-list > li');
    let size = lis.length - 1;
    lis[size].classList.add("hidden");
    lis[size].remove();
    searchedPokemon.pop();
    flagSearch = 0;
}

const inputSearch = document.getElementById("search");
inputSearch.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        if (flagSearch == 1) {
            removeSearchedPokemon();
        }
        if (inputSearch.value != "") {
            flagSearch = 1;
            document.getElementById('loader').classList.remove("hidden");
            fetchForSearch("https://pokeapi.co/api/v2/pokemon/" + inputSearch.value.toLowerCase()).then(data => {
                const ul = document.getElementById("pokemon-list");
                const lis = ul.querySelectorAll('li');
                for (let i = 0;i <= lis.length - 1; i++) {
                    lis[i].classList.add("hidden");
                }
                if (data != 404) {
                    document.getElementById("error").classList.add('hidden');
                    searchedPokemon.push(data);
                    showPokemons(searchedPokemon);
                } else {
                    const error = document.getElementById('error');
                    error.innerHTML = "<p>0 results found.</p>"
                    error.classList.remove('hidden');
                }
                document.getElementById('loader').classList.add("hidden");
                inputSearch.value = "";
                inputSearch.blur()

            })
            .catch(error => {
                console.log(error)
            })
        } else {
            const ul = document.getElementById("pokemon-list");
            const lis = ul.querySelectorAll('#pokemon-list > li');
            for (let i = 0;i <= lis.length - 1; i++) {
                lis[i].classList.remove("hidden");
            }
            if (flagSearch == 1) removeSearchedPokemon();
        }
    }
})