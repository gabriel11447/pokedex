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
                    flagSearch = 0;
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