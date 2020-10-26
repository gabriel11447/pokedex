window.onscroll = function() {
    document.getElementById('loader').classList.remove("hidden");

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        renderPokemons();
        document.getElementById('loader').classList.add("hidden");
    }
};