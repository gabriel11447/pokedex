function createCard(pokemon) {
    return `
    <li>
        <a onclick="storePokemonArray(${checkId(pokemon.id - 1)})" class="card" style="background:${types.find(type => type.name == pokemon.types[0].type.name).card}">
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
            <img src="${checkSpriteUrl(pokemon.id)}.png">
        </a>
    </li>`;
}