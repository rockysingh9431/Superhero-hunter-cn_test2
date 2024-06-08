import { fetchCharApi } from "./helper/fetch_api.js";

let superheroes;

/**
 * Fetches superhero data from API and populates the page.
 */
const getSuperheroData = async () => {
  try {
    superheroes = await fetchCharApi();
    superheroes = superheroes?.data?.results;
    superHeroPopulate(superheroes);
  } catch (error) {
    console.error("Error fetching superhero data:", error);
  }
};

/**
 * Filters the superhero list based on search input.
 * @param {Event} e - The event object.
 */
const filterSuperHeroes = (e) => {
  e.preventDefault();
  const searchInputElement = document.getElementById("search-input");
  const searchText = searchInputElement.value.trim().toLowerCase();

  const filteredHero = superheroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchText)
  );
  superHeroPopulate(filteredHero);
};

// Add event listener to the search button
document
  .getElementById("search-btn")
  .addEventListener("click", filterSuperHeroes);

/**
 * Populates the superhero cards on the page.
 * @param {Array} superheroes - Array of superhero objects.
 */
const superHeroPopulate = (superheroes) => {
  const superheroesElement = document.getElementById("superheroes");
  superheroesElement.innerHTML = ""; // Clear any existing content
  const favoriteArray =
    JSON.parse(localStorage.getItem("favoriteSuperheroes")) || [];

  superheroes.forEach((superhero) => {
    const imageLink = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    const superheroCard = document.createElement("div");
    superheroCard.className = "card m-2";
    superheroCard.id = superhero.id;

    const isFavorite = favoriteArray.find(
      (favHero) => favHero.id === superhero.id
    );
    const heartColor = isFavorite ? "red" : "grey";
    superheroCard.innerHTML = `
      <img src='${imageLink}' height='300px' class="card-img-top" alt="${superhero.name}">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">${superhero.name}</h5>
          <i id='${superhero.id}-like' class="fa-solid fa-heart" style='color:${heartColor}'></i>
        </div>
      </div>
    `;
    superheroesElement.appendChild(superheroCard);

    // Navigate to superhero details page on card click
    superheroCard.addEventListener("click", () => {
      window.location.href = `superhero/superhero.html?id=${superhero.id}`;
    });

    // Add event listener to the favorite icon
    const addToFavoritesElement = document.getElementById(
      `${superhero.id}-like`
    );
    addToFavoritesElement.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to the card
      addToFavorite(superhero);
    });
  });
};

/**
 * Adds or removes a superhero from the favorite list.
 * @param {Object} superhero - The superhero object to add or remove.
 */
const addToFavorite = (superhero) => {
  const favoriteArray =
    JSON.parse(localStorage.getItem("favoriteSuperheroes")) || [];
  const favoriteElement = document.getElementById(`${superhero.id}-like`);
  const isFavoriteIndex = favoriteArray.findIndex(
    (favHero) => favHero.id === superhero.id
  );

  if (isFavoriteIndex !== -1) {
    favoriteArray.splice(isFavoriteIndex, 1);
    favoriteElement.style.color = "grey";
  } else {
    favoriteArray.push(superhero);
    favoriteElement.style.color = "red";
  }
  localStorage.setItem("favoriteSuperheroes", JSON.stringify(favoriteArray));
  // Re-render the superhero list to update the state
  superHeroPopulate(superheroes);
};

// Fetch superhero data on page load
getSuperheroData();
