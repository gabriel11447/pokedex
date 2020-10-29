let pokemonArray = [];
let background = "";

function getPokemonArray() {
    pokemonArray = JSON.parse(window.localStorage.getItem('pokemon'));
    background = types.find(type => type.name == pokemonArray.types[0].type.name).card;
    fetchDescriptionAndGenus(pokemonArray.species.url).then(data => makePokemonInfo(data));
    makePokemonCard();
}

function makePokemonCard() {
  const pokemonCard = `
  <div class="header" style="background:${background}">
  <a href="../../../index.html">
      <img src="https://www.flaticon.com/svg/static/icons/svg/61/61022.svg">
  </a>
    <div class="pokemon-info">
        <span class="pokemon-number">
            #${makeId(pokemonArray.id, 3)}
        </span>
        <span class="pokemon-name">
            ${capitalizeFirstLetter(pokemonArray.species.name)}
        </span>
      </div>
    </div>
    <div class="image" style="background:${background}">
        <img src="${badgeUrl + capitalizeFirstLetter(pokemonArray.types[0].type.name)}.svg">
        <img src="${checkSpriteUrl(pokemonArray.id)}.png" alt="${pokemonArray.name}">
    </div>
    <div class="type" style="background:${background}">
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
  `;
  document.querySelector(".container")
  .insertAdjacentHTML("afterbegin", pokemonCard);
}

function makePokemonInfo(data) {
    const pokemonStats = `
    <div class="stats">
      <h2>Stats</h2>
          <div class="pokemon-stats">
              <ul>` +
              (`${pokemonArray.stats.map((stat, index) => {
                  return `
                  <li>
                      <div class="graph">
                      <b>${stats[index]}</b>
                          <div class="bar-graph">
                              <div class="bar" style="background:${background};width: ${((stat.base_stat)/255)*100}%")></div>
                          </div>
                          <span>
                              ${stat.base_stat}
                          </span>
                      </div>
                  </li>`;
              }).join("")}`)
                 + ` 
              </ul>
          </div>
      </div>
    `;
    document.querySelector(".container")
    .insertAdjacentHTML("beforeend", pokemonStats);

  const pokemonData = `
  <div class="data">
    <p>
        ${makeDescription(data.flavor_text_entries[0].flavor_text)}
    </p>
    <h2>Pokédex Data</h2>
    <div class="pokemon-data">
        <ul>
            <li>
                <span>
                    <b>Species</b>`
                    + (data.genera[7] ? ` ${data.genera[7].genus}` : " Not defined") + `
                </span>
            </li>
            <li>
                <span>
                    <b>Height</b>
                    ${makeDecimal(pokemonArray.height, pokemonArray.height.toString().length)}m
                </span>
            </li>
            <li>
                <span>
                    <b>Weight</b>
                    ${makeDecimal(pokemonArray.weight, pokemonArray.weight.toString().length)}kg
                </span>
            </li>
            <li>
                <span>
                    <b>Abilites</b>`
                        + `${pokemonArray.abilities[0] ? ` ${capitalizeFirstLetter(pokemonArray.abilities[0].ability.name)}` : " Not defined"}`
                        + `${pokemonArray.abilities[1] ? `, ${capitalizeFirstLetter(pokemonArray.abilities[1].ability.name)}` : ""}
                </span>
            </li>
        </ul>
    </div>
  </div>
  `;
  document.querySelector(".container")
  .insertAdjacentHTML("beforeend", pokemonData);
}

function makeDecimal(number, length) {
    let numberString = number.toString();
    let n = numberString.substr(0, length - 1) + "." + numberString.substr(length - 1);
    if (n[0] == ".") n = "0" + n;
    return n;
}

function makeDescription(desc) {
    let content = desc.toString().replace(/\f/g, ' ').split('\f');

    return content;
}

const stats = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];