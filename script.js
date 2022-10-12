const pokemonNames = document.querySelectorAll(".name");

//Background color values for dynamic backgroung color assignment
const backgrounColors = {
  normal: "#B6AD90",
  fire: "#E85D04",
  water: "#168AAD",
  grass: "#06d6a0",
  flying: "#1E6091",
  fighting: "#6A040F",
  poison: "#70e000",
  electric: "#184E77",
  ground: "#582F0E",
  rock: "#C2C5AA",
  psychic: "#233d4d",
  ice: "#4cc9f0",
  bug: "#A68A64",
  ghost: "#eaf4f4",
  steel: "#5c6b73",
  dragon: "#D00000",
  dark: "#03071E",
  fairy: "#ef476f",
};

//Getting 20 pokemon names from the API

const getPokemons = async (num) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${num}&limit=20`
  );
  const data = await response.json();

  getInfo(data.results);
};

//Getting individual pokemon details from another endpoint with pokemon name data

const getInfo = (pokemon) => {
  pokemon.forEach(async (item) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${item.name}`
    );
    const data = await response.json();
    createPokemons(data);
  });
};

//Crearing pokemon cards with the details come from the API

function createPokemons(pokemon) {
  let pokemonID = "";

  if (String(pokemon.id).length === 1) {
    pokemonID = "00" + pokemon.id;
  } else if (String(pokemon.id).length === 2) {
    pokemonID = "0" + pokemon.id;
  } else {
    pokemonID = pokemon.id;
  }
  const pokeBox = document.createElement("div");
  pokeBox.className = "poke-box";
  const typeName = pokemon.types[0].type.name;
  pokeBox.style.border = `10px solid ${backgrounColors[typeName]}`;
  pokeBox.style.backgroundColor = `${backgrounColors[typeName]}`;
  pokeBox.innerHTML = `
  <img class="avatar" width="300px" height="300px" src="${
    pokemon.sprites.other.dream_world.front_default
  }" alt="" />
  <div  class="info-box">
    <p class="id">${pokemonID}</p>
    <div class = "infos">
      <p class="name-title titles">Name:</p>
      <p class="name poke-info">${pokemon.name.toUpperCase()}</p>
    </div>
    <div class = "infos">
    <p class="type-title titles">Type:</p>
    <p class="type poke-info">${pokemon.types[0].type.name.toUpperCase()}</p>
    </div>
    <div class = "infos">
    <p class="hp-title titles">HP:</p>
    <p class="hp poke-info">${pokemon.stats[0].base_stat}</p>
    </div>
    <div class = "infos">
    <p class="attack-title titles">Attack:</p>
    <p class="attack poke-info">${pokemon.stats[1].base_stat}</p>
    </div>
    <div class = "infos">
    <p class="defence-title titles">Defence:</p>
    <p class="defence poke-info">${pokemon.stats[2].base_stat}</p>
    </div>
  </div>
`;

  document.querySelector(".poke-card").appendChild(pokeBox);
}

//Filtering pokemons by name or type

document.querySelector("#search").addEventListener("input", (e) => {
  const searchValue = e.target.value;
  const infoBox = document.querySelectorAll(".info-box");
  infoBox.forEach((item) => {
    const pokeName = item.querySelector(".name").innerHTML.toLowerCase();
    const pokeType = item.querySelector(".type").innerHTML.toLowerCase();
    console.log(pokeName);
    if (
      !pokeName.includes(searchValue.toLowerCase()) &&
      !pokeType.includes(searchValue.toLowerCase())
    ) {
      item.parentElement.style.display = "none";
      document.querySelector(".load-btn").style.display = "none";
    } else {
      item.parentElement.style.display = "block";
      document.querySelector(".load-btn").style.display = "block";
    }
  });
});

// Load more button logic

let counter = 20;
document.querySelector(".load-btn").addEventListener("click", (e) => {
  e.preventDefault();
  getPokemons(counter);
  counter += 20;
});

getPokemons(0);
