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
            let inputNumber = parseInt(inputSearch.value);
            if (!isNaN(inputNumber)) {
                searchedPokemons = pokemonArray.filter((input, index) => {
                    if ((index + 1).toString().includes(inputSearch.value)) {
                        return input;
                    }
            })
            } else {
                searchedPokemons = pokemonArray.filter(input => input.name.includes(inputSearch.value.toLowerCase()));
            }
            document.getElementById("card-list")
            .insertAdjacentHTML("afterbegin", `<ul id="pokemon-list" class="pokemon-list"></ul>`);
            if (searchedPokemons.length > 0) {
                showSearchedPokemons(searchedPokemons);
            } else {
                const error = document.getElementById('error');
                error.innerHTML = "<p>0 results found.</p>"
                document.getElementById("loader").classList.add('hidden');
                error.classList.remove('hidden');
            }
            inputSearch.value = "";
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