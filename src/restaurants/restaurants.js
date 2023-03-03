import { handleLocationByPath, route } from "../router.js";

export function initializeRestaurants() {
  getRestaurants();
}

export function getRestaurantsTemplate() {
  return ` <h1>Choose a restaurant</h1>`;
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

  restaurants.forEach(function (resaurant, i) {
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
