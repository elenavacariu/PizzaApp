export function getMenuTemplate() {
  return ` <h1>Menu</h1>`;
}

export function getRestaurantMenu() {
  fetch(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("BBBBBBBBBBBBB");
      console.log(result);
    });
}

export function addToCart() {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "button button";
  button.innerHTML = "Add to cart";
  button.addEventListener("click");
  document.getElementById("menu");
}
