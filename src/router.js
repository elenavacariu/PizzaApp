import {
  initializeRestaurants,
  getRestaurantDetailsByID,
  restaurantDetailsTemplate,
  restaurantsTemplate,
} from "./restaurants/restaurants";

import { error404Template } from "./404";

import { menuTemplate, getRestaurantMenu } from "./menu/menu";

import { getCartTemplate } from "./cartPages/cartpages";

import { getOrdersTemplate } from "./listOfOrders/listoforders";

export const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routeTemplates = {
  404: error404Template(),
  "": restaurantsTemplate(),
  "#restaurant": restaurantDetailsTemplate(),
  "#menu": menuTemplate(),
  "#cartpages": getCartTemplate(),
  "#listoforders": getOrdersTemplate(),
};

const initializeRoutes = {
  404: () => {},
  "": initializeRestaurants,
  "#restaurant": getRestaurantDetailsByID,
  "#menu": getRestaurantMenu,
  "#cartpages": () => {},
  "#listoforders": () => {},
};

export const handleLocationByPath = async (path) => {
  //debugger;
  if (path) {
    const id = path.split("/")[1];
    window.location.hash = path;
    if (id) {
      const html = routeTemplates[path.split("/")[0]] || routeTemplates[404];
      document.getElementById("main").innerHTML = html;
      initializeRoutes[path.split("/")[0]](id);
    } else {
      const html = routeTemplates[path] || routeTemplates[404];
      document.getElementById("main").innerHTML = html;
      initializeRoutes[path]();
    }
  } else {
    const hash = "";
    const html = routeTemplates[""] || routeTemplates[404];
    document.getElementById("main").innerHTML = html;
    initializeRoutes[""]();
  }
};

handleLocationByPath("");
