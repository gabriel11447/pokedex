async function infiniteScroll() {
    document.getElementById('loader').classList.remove("hidden");

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {
        await renderPokemons();
        document.getElementById('loader').classList.add("hidden");
    }
}

window.addEventListener('scroll', infiniteScroll);