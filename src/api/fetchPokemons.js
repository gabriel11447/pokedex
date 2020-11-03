async function getPokemons(pokemons) {
  let response = await Promise.all(pokemons.map(async pokemon => {
    let responsePromiseAll = await (await fetch(pokemon.url)).json();
    return responsePromiseAll;
  }))
  return response;
}

async function fetchData(url) {
  let response = await(await fetch(url)).json();
  return response;
}