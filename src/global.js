const badgeUrl =
  "https://raw.githubusercontent.com/vinicoder/pokedex/9a20a03d88361a15b20b450e8933b79e9f175259/src/assets/icons/types/";
const spriteUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function makeId(id, length) {
  var len = length - ("" + id).length;
  return (len > 0 ? new Array(++len).join("0") : "") + id;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkSpriteUrl(id) {
  return spriteUrl + id;
}

function checkId(id) {
  if (id >= 10000) {
    return 893 + (id - 10000);
  }
  return id;
}

const types = [
  { name: "normal", color: "#A8A77A", card: "#8a8969" },
  { name: "fire", color: "#EE8130", card: "#fa9550" },
  { name: "water", color: "#6890F0", card: "#739ef5" },
  { name: "electric", color: "#F8D030", card: "#e0bd31" },
  { name: "grass", color: "#7AC74C", card: "#63a163" },
  { name: "ice", color: "#98D8D8", card: "#75c7c3" },
  { name: "fighting", color: "#C22E28", card: "#8f4542" },
  { name: "poison", color: "#A33EA1", card: "#a865a7" },
  { name: "ground", color: "#E2BF65", card: "#a18b54" },
  { name: "flying", color: "#A98FF3", card: "#bba6f5" },
  { name: "psychic", color: "#F85888", card: "#d6517a" },
  { name: "bug", color: "#A8B820", card: "#94a310" },
  { name: "rock", color: "#B6A136", card: "#85762e" },
  { name: "ghost", color: "#735797", card: "#7a6791" },
  { name: "dragon", color: "#6F35FC", card: "#6d49c9" },
  { name: "dark", color: "#705746", card: "#665e58" },
  { name: "steel", color: "#B7B7CE", card: "#8e8ea3" },
  { name: "fairy", color: "#EE99AC", card: "#e37f95" },
];
