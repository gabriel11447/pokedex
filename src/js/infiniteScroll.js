function infiniteScroll() {
    document.getElementById('loader').classList.remove("hidden");

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        renderPokemons();
        document.getElementById('loader').classList.add("hidden");
    }
}

window.addEventListener('scroll', infiniteScroll);