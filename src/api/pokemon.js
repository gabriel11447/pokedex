function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        URL_TO_FETCH = data.next;
        const pokemons = data.results;
        return Promise.all(pokemons.map(pokemon => 
          fetch(pokemon.url)
            .then(response => response.json())
        ))
      })
      .then(promiseAllResponse => promiseAllResponse);
}

function fetchDescriptionAndGenus(url) {
  return fetch(url)
    .then(response => response.json());
}