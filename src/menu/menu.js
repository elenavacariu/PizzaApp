// export function getMenuTemplate() {
//   return ` <h1>Menu</h1>`;
// }

export function getRestaurantMenu() {
  fetch(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      const menuBody = document.getElementById("main");
      result.forEach((item) => {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const topping = document.createElement("td");
        const price = document.createElement("td");

        name.innerText = item.name;
        topping.innerText = (item.topping && item.topping.join(", ")) || " ";
        price.innerText = ` $ ${item.price}`;

        row.appendChild(name);
        row.appendChild(topping);
        row.appendChild(price);

        menuBody.appendChild(row);
      });
    });
}

export function addToCart() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button button";
  button.innerHTML = "Add to cart";
  button.addEventListener("click");
  document.getElementById("menu");
}
