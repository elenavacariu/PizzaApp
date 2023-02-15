const error404Template = () => {
  `<div style="text-align: center">
  <h1>404 Not Found</h1>
  <p>Oh no! It looks like the page you're trying to get to is missing!</p>
  </div>`;
};

const restaurantsTemplate = () => `
  <h1>Choose a restaurant</h1>
  <div id="restaurants"></div>
`;

const restaurantDetailsTemplate = () => `
  <h1>Restaurant Details</h1>
  <div id="restaurant-details"></div>
`;

const menuTemplate = () => {
  `<h1>Menu</h1>`;
};

export {
  error404Template,
  restaurantsTemplate,
  restaurantDetailsTemplate,
  menuTemplate,
};
