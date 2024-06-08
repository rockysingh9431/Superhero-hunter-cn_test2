// Importing the fetchCharApi function from the helper module
import { fetchCharApi } from "../helper/fetch_api.js";

let superheroes;

// Function to fetch and display superhero data
const getSuperheroData = async () => {
  try {
    superheroes = await fetchCharApi(); // Fetching superhero data
    superheroes = superheroes?.data?.results; // Extracting results from the fetched data

    // Getting the hero ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get("id");

    // Finding the superhero with the matching ID
    const hero = superheroes.find((superhero) => superhero.id === +heroId); // +heroId converts heroId to a number from string

    displayHero(hero); // Displaying the superhero data
  } catch (error) {
    console.error("Error fetching superhero data:", error);
  }
};

// DOM elements for displaying superhero information
const descImgElement = document.getElementById("descImg");
const comicsElement = document.getElementById("comics");
const eventsElement = document.getElementById("events");
const storiesElement = document.getElementById("stories");
const seriesElement = document.getElementById("series");

// Function to display superhero details
const displayHero = (superhero) => {
  if (!superhero) {
    console.error("Superhero data is not available");
    return;
  }

  const { comics, description, events, name, series, stories, thumbnail } =
    superhero;
  const imageLink = `${thumbnail.path}.${thumbnail.extension}`;

  // Updating the DOM with superhero details
  descImgElement.innerHTML = `
    <img src="${imageLink}" class='hero-img' alt="${name}" />
    <div class="name-desc">
      <h1 class="name">${name}</h1>
      <h4 class="description">${description}</h4>
      <div class="cess-container">
        <ul class="stock-list">
          <li><a href="#comics">Comics: ${comics.available}</a></li>
          <li><a href="#series">Series: ${series.available}</a></li>
        </ul>
        <ul class="stock-list">
          <li><a href="#stories">Stories: ${stories.available}</a></li>
          <li><a href="#events">Events: ${events.available}</a></li>
        </ul>
      </div>
    </div>
  `;

  comicsElement.innerHTML = displayComics(comics);
  eventsElement.innerHTML = displayEvents(events);
  storiesElement.innerHTML = displayStories(stories);
  seriesElement.innerHTML = displaySeries(series);
};

// Function to display comics
const displayComics = (comics) => {
  const { items } = comics;
  return `
    <h1 class="title">Comics</h1>
    <hr class="title-underline"/>
    ${
      items.length
        ? `<div class="mag">
            ${items
              .map((item) => `<p class='cess-name'>${item.name}</p>`)
              .join("")}
          </div>`
        : `<div class='mag cess-name'>No Comics to show</div>`
    }
  `;
};

// Function to display events
const displayEvents = (events) => {
  const { items } = events;
  return `
    <h1 class="title">Events</h1>
    <hr class="title-underline"/>
    ${
      items.length
        ? `<div class="mag">
            ${items
              .map((item) => `<p class='cess-name'>${item.name}</p>`)
              .join("")}
          </div>`
        : `<div class='mag cess-name'>No Events to show</div>`
    }
  `;
};

// Function to display stories
const displayStories = (stories) => {
  const { items } = stories;
  return `
    <h1 class="title">Stories</h1>
    <hr class="title-underline"/>
    ${
      items.length
        ? `<div class="mag">
            ${items
              .map((item) => `<p class='cess-name'>${item.name}</p>`)
              .join("")}
          </div>`
        : `<div class='mag cess-name'>No Stories to show</div>`
    }
  `;
};

// Function to display series
const displaySeries = (series) => {
  const { items } = series;
  return `
    <h1 class="title">Series</h1>
    <hr class="title-underline"/> 
    ${
      items.length
        ? `<div class="mag">
            ${items
              .map((item) => `<p class='cess-name'>${item.name}</p>`)
              .join("")}
          </div>`
        : `<div class='mag cess-name'>No Series to show</div>`
    }
  `;
};

// Initial call to fetch and display superhero data
getSuperheroData();
