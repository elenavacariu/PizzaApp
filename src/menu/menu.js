import { fetchData } from "../helpers.js";

export function menuTemplate() {
  return ` <h1>Menu</h1>`;
}

export function getRestaurantMenu() {
  fetchData(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank`
  ).then((result) => {
    const menuBody = document.getElementById("main");
    result.forEach((item) => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const topping = document.createElement("td");
      const price = document.createElement("td");
      // create the "Add to cart" button
      const addToCartBtn = document.createElement("button");

      name.innerText = item.name;
      topping.innerText = (item.topping && item.topping.join(", ")) || " ";
      price.innerText = ` $ ${item.price}`;
      addToCartBtn.innerText = "Add to cart";

      addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!Array.isArray(cart)) {
          cart = [];
        }
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${item.name} has been added to your cart!`);

        console.log(item);
      });

      row.appendChild(name);
      row.appendChild(topping);
      row.appendChild(price);
      row.appendChild(addToCartBtn);

      menuBody.appendChild(row);
    });
  });
}
