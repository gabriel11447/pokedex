function removeSearchedPokemon() {
    document.getElementById("pokemon-list").remove();
    let size = searchedPokemons.length - 1;
    console.log(searchedPokemons);
    for (let i = 0; i < size; i++) {
        searchedPokemons.pop();
    }
}

const inputSearch = document.getElementById("search");
inputSearch.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        removeSearchedPokemon();
        if (inputSearch.value != "") {
            flagSearch = 1;
            document.getElementById('loader').classList.remove("hidden");
            searchedPokemons = pokemonArray.filter(input => input.name.includes(inputSearch.value.toLowerCase()));
            document.getElementById("card-list")
            .insertAdjacentHTML("afterbegin", `<ul id="pokemon-list" class="pokemon-list"></ul>`);
            if (searchedPokemons.length > 0) {
                document.getElementById("error").classList.add('hidden');
                showSearchedPokemons(searchedPokemons);
            } else {
                flagSearch = 0;
                const error = document.getElementById('error');
                error.innerHTML = "<p>0 results found.</p>"
                error.classList.remove('hidden');
            }
            document.getElementById('loader').classList.add("hidden");
            inputSearch.value = "";
            inputSearch.blur()
        } else {
            document.getElementById("card-list")
            .insertAdjacentHTML("afterbegin", `<ul id="pokemon-list" class="pokemon-list"></ul>`);
            calls = 0;
            renderPokemons();
        }
    }
})