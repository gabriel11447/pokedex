function fetchData() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        if(!response.ok) {
          throw Error("ERROR");
        }
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        const pokemons = data.results.map((pokemon, id) => {
          return `<li>
            <a class="card">
              <div class="pokemon-info">
                <span class="pokemon-number">
                  #${makeId(id + 1, 3)}
                </span>
                <span class="pokemon-name">
                ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </span>
                <ul class="pokemon-type">
                  <li class="badge">
                      <img src="https://raw.githubusercontent.com/vinicoder/pokedex/9a20a03d88361a15b20b450e8933b79e9f175259/src/assets/icons/types/Grass.svg" alt="Grass">
                      Grass
                  </li>
                </ul>
              </div>
                <img src="https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/${id + 1}.svg">
            </a>
          </li>
          `;
        })
        .join("");
        console.log(pokemons);
        document.querySelector("#pokemon-list")
        .insertAdjacentHTML("afterbegin", pokemons);
      })

        .catch(error => {
          console.log(error)
      })
}    

function makeId(id, length) {
  var len = length - (''+ id).length;
  return (len > 0 ? new Array(++len).join('0') : '') + id;
}

fetchData();
    