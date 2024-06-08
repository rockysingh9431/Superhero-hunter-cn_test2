let superheroes;

// Fetch superhero data from localStorage
const getSuperheroData = async () => {
  // Retrieve superhero data from localStorage and parse it
  superheroes = JSON.parse(localStorage.getItem("favoriteSuperheroes"));

  // Populate the superheroes on the page
  superHeroPopulate(superheroes);
};

// Filter superheroes based on search input
const filterSuperHeroes = (e) => {
  e.preventDefault();
  // Get the search input element and its value
  const searchInputElement = document.getElementById("search-input");
  const searchText = searchInputElement.value.trim().toLowerCase();

  // Filter superheroes based on the search text
  const filteredHero = superheroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchText);
  });

  // Populate the filtered superheroes on the page
  superHeroPopulate(filteredHero);
};

// Event listener for search button
document
  .getElementById("search-btn")
  .addEventListener("click", filterSuperHeroes);

// Populate superheroes on the page
const superHeroPopulate = (superheroes) => {
  const superheroesElement = document.getElementById("superheroes");
  superheroesElement.innerHTML = ""; // Clear any existing content
  const favoriteArray =
    JSON.parse(localStorage.getItem("favoriteSuperheroes")) || [];

  superheroes.forEach((superhero) => {
    // Create the image link for the superhero
    const imageLink = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

    // Create a card element for the superhero
    const superheroCard = document.createElement("div");
    superheroCard.className = "card m-2";
    superheroCard.id = superhero.id;

    // Check if the superhero is in the favorites list
    const isFavorite = favoriteArray.find(
      (favHero) => favHero.id === superhero.id
    );
    const heartColor = isFavorite ? "red" : "grey";

    // Set the inner HTML of the card element
    superheroCard.innerHTML = `
      <img src='${imageLink}' height='300px' class="card-img-top" alt="${superhero.name}">
      <div class="card-body">
        <div class="d-flex justify-content-between">
        <h5 class="card-title">${superhero.name}</h5>
        <i id='${superhero.id}-like' class="fa-solid fa-heart" style='color:${heartColor}'></i></div>
      </div>
    `;

    // Append the card element to the superheroes container
    superheroesElement.appendChild(superheroCard);

    // Add click event to navigate to the superhero page
    superheroCard.addEventListener("click", () => {
      // Pass superhero ID to the superhero page
      window.location.href = `../superhero/superhero.html?id=${superhero.id}`;
    });

    // Add event listener for the favorite icon
    const addToFavoritesElement = document.getElementById(
      `${superhero.id}-like`
    );
    addToFavoritesElement.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to the card
      addToFavorite(superhero); // Add or remove the superhero from favorites
      getSuperheroData(); // Refresh the superhero data
    });
  });
};

// Add or remove superhero from favorites
const addToFavorite = (superhero) => {
  // Retrieve the favorite superheroes from localStorage and parse it
  const favoriteArray =
    JSON.parse(localStorage.getItem("favoriteSuperheroes")) || [];

  // Find the index of the superhero in the favorites list
  const isFavoriteIndex = favoriteArray.findIndex(
    (favHero) => favHero.id === superhero.id
  );

  // If the superhero is already in the favorites list, remove it
  if (isFavoriteIndex !== -1) {
    favoriteArray.splice(isFavoriteIndex, 1);
  } else {
    // Otherwise, add the superhero to the favorites list
    favoriteArray.push(superhero);
  }
  // Save the updated favorites list to localStorage
  localStorage.setItem("favoriteSuperheroes", JSON.stringify(favoriteArray));
};

// Fetch superhero data on page load
getSuperheroData();
