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

function fetchForSearch(url) {
  return fetch(url)
  .then(response => { 
    if (response.status == 200) return response.json();
    return 404;
  })
  .then(data => data);
}

function fetchDescriptionAndGenus(url) {
  return fetch(url)
    .then(response => response.json());
}