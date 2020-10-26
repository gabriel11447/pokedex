function fetchData(url) {
  return fetch(url)
  .then(response => response.json())
}

function getPokemons(pokemons) {
  return Promise.all(pokemons.map(pokemon => {
    return fetch(pokemon.url)
      .then(response => response.json())
  })
  )
}

function fetchDescriptionAndGenus(url) {
  return fetch(url)
    .then(response => response.json());
}