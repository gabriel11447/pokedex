let pokemonArray = [];

window.makeActive = function(event) {
    document.querySelectorAll('ul li a.active').forEach(function(item) {
    item.classList.remove('active');
  })
    event.target.classList.add("active");
};

function getPokemonArray() {
    pokemonArray = JSON.parse(window.localStorage.getItem('pokemons'));
    //  localStorage.clear();
    makePokemonCard();
    makePokemonInfo();
}

function makePokemonCard() {
  const pokemonCard = `
  <div class="card" style="background:${types.find(type => type.name == pokemonArray.types[0].type.name).card}">
    <img src="${spriteUrl + pokemonArray.id}.png" alt="${pokemonArray.name}">
    <div class="pokemon-info">
        <span class="pokemon-number">
            #${makeId(pokemonArray.id, 3)}
        </span>
        <span class="pokemon-name">
            ${capitalizeFirstLetter(pokemonArray.species.name)}
        </span>
        <ul class="pokemon-type">
          <li class="badge" style="background:${types.find(type => type.name == pokemonArray.types[0].type.name).color}">
            <img src="${badgeUrl + capitalizeFirstLetter(pokemonArray.types[0].type.name)}.svg" 
            alt="${pokemonArray.types[0].type.name}">
            ${capitalizeFirstLetter(pokemonArray.types[0].type.name)}
          </li>` +
          (pokemonArray.types[1] ? `
          <li class="badge" style="background:${types.find(type => type.name == pokemonArray.types[1].type.name).color}">
            <img src="${badgeUrl + capitalizeFirstLetter(pokemonArray.types[1].type.name)}.svg" 
            alt="${pokemonArray.types[1].type.name}">
            ${capitalizeFirstLetter(pokemonArray.types[1].type.name)}
          </li>` 
    : "") +
    `
        </ul>
    </div>
  </div>
  `;
  document.querySelector("header")
  .insertAdjacentHTML("afterbegin", pokemonCard);
}

function makePokemonInfo() {
  const pokemonInfo = `
  <h2>Pokédex Data</h2>
  <div class="pokemon-data">
      <ul>
          <li>
              <span>
                  <b>Species</b>
                  ${pokemonArray.species.name}
              </span>
          </li>
          <li>
              <span>
                  <b>Height</b>
                  0.${pokemonArray.height}m
              </span>
          </li>
          <li>
              <span>
                  <b>Weight</b>
                  ${pokemonArray.weight}kg
              </span>
          </li>
          <li>
              <span>
                  <b>Abilites</b>
                  1. ${capitalizeFirstLetter(pokemonArray.abilities[0].ability.name)}
                  2. ${capitalizeFirstLetter(pokemonArray.abilities[1].ability.name)}
              </span>
          </li>
      </ul>
  </div>            
  `;
  document.querySelector("#info")
  .insertAdjacentHTML("afterbegin", pokemonInfo);

  const pokemonData = `
  <h2>Stats</h2>
    <div class="pokemon-stats">
        <ul>` +
        (pokemonArray.stats.map(status => {
            return `
            <li>
                <span>
                    <b>${capitalizeFirstLetter(status.stat.name)}</b>
                    ${status.base_stat}
                </span>
            </li>
            `
        })
        .join("")) + `
        </ul>
    </div>
  `;
  document.querySelector("#stats")
  .insertAdjacentHTML("afterbegin", pokemonData);
}