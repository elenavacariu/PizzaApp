function getRestaurantByID() {
  fetch(
    `https://private-anon-af35c927af-pizzaapp.apiary-mock.com/restaurants/2`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

function getRestaurantMenu() {
  fetch(
    `https://private-anon-af35c927af-pizzaapp.apiary-mock.com/restaurants/2/menu`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}
