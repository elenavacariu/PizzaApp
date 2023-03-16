import {
  initializeRestaurants,
  getRestaurantsTemplate,
} from "./restaurants/restaurants";

import { error404Template } from "./404";

import {
  getMenuTemplate,
  getRestaurantDetailsByID,
  getRestaurantsDetailsTemplate,
} from "./menu/menu";

import {
  getCartTemplate,
  displayItemsFromLocalStorage,
} from "./cartPages/cartpages";

export const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routeTemplates = {
  404: error404Template(),
  "": getRestaurantsTemplate(),
  "#restaurant": getRestaurantsDetailsTemplate(),
  "#menu": getMenuTemplate(),
  "#cartpages": getCartTemplate(),
};

const initializeRoutes = {
  404: () => {},
  "": initializeRestaurants,
  "#restaurant": getRestaurantDetailsByID,
  "#cartpages": displayItemsFromLocalStorage,
};

export const handleLocationByPath = async (path) => {
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
    const html = routeTemplates[""] || routeTemplates[404];
    document.getElementById("main").innerHTML = html;
    initializeRoutes[""]();
  }
};

handleLocationByPath(window.location.hash);
