import { str } from "ajv";
import { getRestaurantMenu } from "../menu/menu.js";
import { handleLocation, handleLocationByPath, route } from "../router.js";

export function initializeRestaurants() {
  getRestaurants();
}

export function getRestaurantsTemplate() {
  return `<h1>Choose a restaurant</h1>`;
}

export function getRestaurantDetails() {
  return `<h1>Restaurant Details</h1>`;
}

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
      div.className = "main-button";
      //debugger;

      var restaurantId = document.createElement("p");
      restaurantId.innerHTML = "Id: " + result.id;
      var restaurantName = document.createElement("p");
      restaurantName.innerHTML = "Name: " + result.name;
      var restaurantAddress1 = document.createElement("p");
      restaurantAddress1.innerHTML = "Address1: " + result.address1;
      var restaurantAddress2 = document.createElement("p");
      restaurantAddress2.innerHTML = "Address2: " + result.address2;
      var restaurantLatitude = document.createElement("p");
      restaurantLatitude.innerHTML = "Latitude: " + result.latitude;
      var restaurantLongitude = document.createElement("p");
      restaurantLongitude.innerHTML = "Longitude: " + result.longitude;

      div.appendChild(restaurantId);
      div.appendChild(restaurantName);
      div.appendChild(restaurantAddress1);
      div.appendChild(restaurantAddress2);
      div.appendChild(restaurantLatitude);
      div.appendChild(restaurantLongitude);
      document.getElementById("main").appendChild(div);

      let div2 = document.createElement("div");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "button button";
      button.innerHTML = "Menu";

      //debugger;
      button.addEventListener("click", getRestaurantMenu);
      console.log("am ajuns aiciiiiiiiii");
      div2.appendChild(button);

      document.getElementById("main").appendChild(div2);
    });

  // {
  //   "id": 2,
  //   "name": "Pizzeria Apan",
  //   "address1": "Ljusslingan 4",
  //   "address2": "120 31 Stockholm",
  //   "latitude": 59.315709,
  //   "longitude": 18.033507
  // }
}

export function clickRestaurant(e) {
  var elementId = e.target.id;
  //console.log("The ID of the clicked element is: " + elementId);
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

  for (var i = 0; i < restaurants.length; i++) {
    if (i > 0) {
      let pre = document.createElement("a");
      pre.className = "a";
      pre.innerHTML = " | ";
      div.appendChild(pre);
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "button button";
    button.innerHTML = restaurants[i].name;
    button.id = restaurants[i].id;
    button.addEventListener("click", clickRestaurant);
    div.appendChild(button);
  }
  document.getElementById("main").appendChild(div);
}
