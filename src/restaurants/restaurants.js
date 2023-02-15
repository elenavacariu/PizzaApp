import { str } from "ajv";
import { getRestaurantMenu } from "../menu/menu.js";
import { handleLocation, handleLocationByPath, route } from "../router.js";

export function initializeRestaurants() {
  getRestaurants();
}

// export function getRestaurantsTemplate() {
//   return `<h1>Choose a restaurant</h1>`;
// }

// export function getRestaurantDetails() {
//   return `<h1>Restaurant Details</h1>`;
// }

export function getRestaurantDetailsByID(id) {
  fetch(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/${id}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      let div = document.createElement("div");

      const restaurantId = document.createElement("p");
      restaurantId.innerHTML = "Id: " + result.id;
      const restaurantName = document.createElement("p");
      restaurantName.innerHTML = "Name: " + result.name;
      const restaurantAddress1 = document.createElement("p");
      restaurantAddress1.innerHTML = "Address1: " + result.address1;
      const restaurantAddress2 = document.createElement("p");
      restaurantAddress2.innerHTML = "Address2: " + result.address2;
      const restaurantLatitude = document.createElement("p");
      restaurantLatitude.innerHTML = "Latitude: " + result.latitude;
      const restaurantLongitude = document.createElement("p");
      restaurantLongitude.innerHTML = "Longitude: " + result.longitude;

      div.appendChild(restaurantId);
      div.appendChild(restaurantName);
      div.appendChild(restaurantAddress1);
      div.appendChild(restaurantAddress2);
      div.appendChild(restaurantLatitude);
      div.appendChild(restaurantLongitude);
      document.getElementById("main").appendChild(div);

      let div2 = document.createElement("div");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button";
      button.innerHTML = "Menu";

      let hasButtonBeenClicked = false;

      //click button only one time
      button.addEventListener("click", function () {
        if (!hasButtonBeenClicked) {
          getRestaurantMenu();
          hasButtonBeenClicked = true;
        }
      });

      div2.appendChild(button);
      document.getElementById("main").appendChild(div2);
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
  let div = document.createElement("div");
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
