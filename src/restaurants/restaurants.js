import { fetchData } from "../helpers.js";
import { getRestaurantMenu } from "../menu/menu.js";
import { handleLocationByPath, route } from "../router.js";

export function initializeRestaurants() {
  getRestaurants();
}

export function getRestaurantsTemplate() {
  return ` <h1>Choose a restaurant</h1>`;
}

export function restaurantDetailsTemplate() {
  return `
  <h1>Restaurant Details</h1>
  <div>
  <h3 id = "name"></h3>
  <p id = "address1"></p>
  <p id = "address2"></p>
  <p id = "latitude"></p>
  <p id = "longitude"></p>
  </div>
  <div>
  <button id="button">Menu</button>
  </div>`;
}

export function getRestaurantDetailsByID(id) {
  fetchData(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/${id}`
  ).then((result) => {
    document.getElementById("name").innerHTML = `${result.name}`;
    document.getElementById(
      "address1"
    ).innerHTML = `Address I: ${result.address1}`;
    document.getElementById(
      "address2"
    ).innerHTML = `Address II: ${result.address2}`;
    document.getElementById(
      "latitude"
    ).innerHTML = `Latitude: ${result.latitude}`;
    document.getElementById(
      "longitude"
    ).innerHTML = `Longitude: ${result.longitude}`;

    let button = document.getElementById("button");

    button.addEventListener("click", function () {
      button.disabled = true;
      getRestaurantMenu();
    });
  });
}

export function clickRestaurant(e) {
  let elementId = e.target.id;
  handleLocationByPath(`#restaurant/${elementId}`);
}

export function getRestaurants() {
  fetch(
    "http://private-anon-af35c927af-pizzaapp.apiary-mock.com/restaurants/",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      convertJsonToHtml(result);
    });
}

export function convertJsonToHtml(restaurants) {
  const div = document.createElement("div");
  div.className = "main-button";

  restaurants.forEach(function (restaurant, i) {
    if (i > 0) {
      let pre = document.createElement("a");
      pre.className = "a";
      pre.innerHTML = " | ";
      div.appendChild(pre);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button";
    button.innerHTML = restaurants[i].name;
    button.id = restaurants[i].id;
    button.addEventListener("click", clickRestaurant);
    div.appendChild(button);
  });
  document.getElementById("main").appendChild(div);
}
