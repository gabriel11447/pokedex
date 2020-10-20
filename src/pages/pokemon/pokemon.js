let pokemonArray = [];

window.makeActive = function(event) {
    document.querySelectorAll('ul li a.active').forEach(function(item) {
    item.classList.remove('active');
  })
    event.target.classList.add("active");
};

function getPokemonArray() {
    pokemonArray = JSON.parse(window.localStorage.getItem('pokemons'));
    //localStorage.clear();
    console.log(pokemonArray);
    const height = pokemonArray.height;
    document.querySelector("#info")
    .insertAdjacentHTML("afterbegin", height);
}