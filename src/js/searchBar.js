let idFlag = 0;

let inputMask = "";

function removeSearchedPokemon() {
    document.getElementById("pokemon-list").remove();
    let size = searchedPokemons.length - 1;
    for (let i = 0; i < size; i++) {
        searchedPokemons.pop();
    }
}

const inputSearch = document.getElementById("search");
inputSearch.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        document.getElementById('loader').classList.remove("hidden");
        document.getElementById("error").classList.add('hidden');
        removeSearchedPokemon();
        if (inputSearch.value != "") {
            if (!isNaN(inputSearch.value)) {
                searchedPokemons = pokemonArray.filter((input, index) => {
                    if(inputSearch.value >= 10001) {
                        inputMask = inputSearch.value;
                        inputSearch.value = 893 + (inputSearch.value - 10000);
                        idFlag = 1;
                    }
                    if ((index + 1).toString().includes(inputSearch.value)) {
                        if (index >= 893 && idFlag != 1) return;
                        idFlag = 0;
                        return input;
                    }
                })
            } else searchedPokemons = pokemonArray.filter(input => input.name.includes(inputSearch.value.toLowerCase()));
            document.getElementById("card-list")
            .insertAdjacentHTML("afterbegin", `<ul id="pokemon-list" class="pokemon-list"></ul>`);
            inputMask ? inputSearch.value = inputMask : null;
            inputMask = "";

            if (searchedPokemons.length > 0) {
                showSearchedPokemons(searchedPokemons);
            } else {
                const error = document.getElementById('error');
                error.innerHTML = "<p>0 results found.</p>"
                document.getElementById("loader").classList.add('hidden');
                error.classList.remove('hidden');
            }
            inputSearch.blur()
        } else {
            document.getElementById("card-list")
            .insertAdjacentHTML("afterbegin", `<ul id="pokemon-list" class="pokemon-list"></ul>`);
            calls = 0;
            window.addEventListener('scroll', infiniteScroll);
            renderPokemons();
        }
    }
})