var pokemonArray =[];

async function fetchData(url) {
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        const pokemons = data.results;
        pokemons.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => {
              return response.json();
            })
            .then(data => {
              pokemonArray.push(data);
            })
        })
        URL_TO_FETCH = data.next;
        console.log(URL_TO_FETCH);
        return data;
    })
} 