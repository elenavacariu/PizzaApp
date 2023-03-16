import { fetchData } from "../helpers.js";

export function getRestaurantsDetailsTemplate() {
  return `
  <div id="loader" class="center"></div>
  <h1>Restaurant Details</h1>
  <div class="hide-content">
    <h4 id="name"></h4>
    <h4 id="address1-label" style="display: inline-block;">Address I: </h4>
    <p id="address1" style="display: inline-block;"></p>
    <br>
    <h4 id="address2-label" style="display: inline-block;">Address II: </h4>
    <p id="address2" style="display: inline-block;"></p>
    <br>
    <h4 id="latitude-label" style="display: inline-block;">Latitude:</h4>
    <p id="latitude" style="display: inline-block;"></p>
    <br>
    <h4 id="longitude-label" style="display: inline-block;">Longitude:</h4>
    <p id="longitude" style="display: inline-block;"></p>
    <h1>Menu</h1>
  </div>
 `;
}

export function getMenuTemplate() {
  return `
  <table>
  <tbody id="main"></tbody>
  <tfoot>
    <tr id="total-row-quantity">
      <td colspan="2" id="total-quantity">Total quantity: 0</td>
    </tr>
    <br>
    <tr id="total-row-price">
      <td colspan="2" id="total-price">Total price: $0.00</td>
    </tr>
  </tfoot>
  </table>
  `;
}

export function getRestaurantDetailsByID(id) {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main");
  const mainDiv = document.querySelector(".hide-content");

  let restaurantData;
  let menuData;

  loader.classList.remove("hidden");
  main.classList.add("hidden");
  mainDiv.classList.remove("hide-content");

  Promise.all([
    fetchData(
      `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/${id}`
    ),
    fetchData(
      `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/${id}/menu?category=Pizza&orderBy=rank`
    ),
  ])
    .then(([restaurant, menu]) => {
      restaurantData = restaurant;
      menuData = menu;

      console.log(restaurant);
      console.log(menu);

      document.getElementById("name").innerHTML = restaurant.name;
      document.getElementById("address1").innerHTML = restaurant.address1;
      document.getElementById("address2").innerHTML = restaurant.address2;
      document.getElementById("latitude").innerHTML = restaurant.latitude;
      document.getElementById("longitude").innerHTML = restaurant.longitude;

      const menuBody = document.getElementById("main");
      menu.forEach((item) => {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const topping = document.createElement("td");
        const price = document.createElement("td");
        const addToCartBtn = document.createElement("button");

        name.textContent = item.name;
        topping.textContent = item.topping?.join(", ") || " ";
        price.textContent = ` $ ${item.price}`;
        addToCartBtn.textContent = "Add to cart";

        addToCartBtn.addEventListener("click", () => {
          addToCart(item, menuBody);
        });

        row.appendChild(name);
        row.appendChild(topping);
        row.appendChild(price);
        row.appendChild(addToCartBtn);
        menuBody.appendChild(row);
      });

      main.insertAdjacentHTML("beforeend", getMenuTemplate());
      loader.classList.add("hidden");
      main.classList.remove("hidden");

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      recalculateTotals(cart);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addToCart(item) {
  let cart = [];
  const id = getIdFromHash();
  const menuItem = { item, id };
  const getCart = localStorage.getItem("cart");

  if (getCart) {
    cart = JSON.parse(getCart);
  }

  cart.push(menuItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  recalculateTotals(cart);
}

function getIdFromHash() {
  const hash = window.location.hash;
  if (!hash) {
    return null;
  }
  const hashParts = hash.split("/");
  if (hashParts.length < 2 || !hashParts[1]) {
    return null;
  }
  return hashParts[1];
}

function recalculateTotals(cart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  cart.forEach((menuItem) => {
    totalPrice += menuItem.item.price;
    totalQuantity++;
  });
  const totalQuantityCol = document.getElementById("total-quantity");
  totalQuantityCol.textContent = `Total quantity: ${totalQuantity}`;

  const totalPriceCol = document.getElementById("total-price");
  totalPriceCol.textContent = `Total price: $${totalPrice.toFixed(2)}`;
}
