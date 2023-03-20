import {
  getRestaurants,
  getRestaurantsTemplate,
} from "../restaurants/restaurants";

import { handleLocationByPath, route } from "../router.js";

export function getCartTemplate() {
  return `
  <h1>Cart</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Toppings</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="cart-item"></tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total</td>
        <td>$0.00</td>
      </tr>
    </tfoot>
  </table>
  <br>
  <div style="text-align: center;">
    <button id="checkout-btn">Checkout</button>
  </div>
`;
}

function generateCartItemsHtml(cart) {
  return cart
    .map((cartItem, index) => {
      const item = cartItem.item;
      return `
        <tr>
          <td>${item.name} &nbsp;</td>
          <td>${item.topping?.join(", ") || " "} &nbsp;</td>
          <td>$${item.price.toFixed(2)}</td>
          <td><button data-id="${index}" class="remove-item-btn">Remove</button></td>
        </tr>
      `;
    })
    .join("");
}

function calculateTotalPrice(cart) {
  return cart.reduce((acc, cartItem) => acc + cartItem.item.price, 0);
}

export const displayItemsFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTemplate = getCartTemplate();
  const cartItemsHtml = generateCartItemsHtml(cart);
  const totalPrice = calculateTotalPrice(cart);

  document.getElementById("main").innerHTML = cartTemplate;
  document.getElementById("cart-item").innerHTML = cartItemsHtml;

  const cartTableFooter = document.querySelector("tfoot tr");
  const totalPriceCell = cartTableFooter.querySelector("td:last-child");
  totalPriceCell.textContent = `$${totalPrice.toFixed(2)}`;

  removeItem();
};

function removeItem() {
  //debugger;
  const removeItemBtns = document.querySelectorAll(".remove-item-btn");
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.id;
      removeItemFromCart(itemId);
      window.location.hash || "";
      displayItemsFromLocalStorage();
    });
  });
}

function removeItemFromCart(itemId) {
  //debugger;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (itemId >= 0) {
    cart.splice(itemId, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }
}

document.getElementById("cart-link").addEventListener("click", (event) => {
  event.preventDefault();
  displayItemsFromLocalStorage();
  handleLocationByPath(`#cartpages`);
});

document.getElementById("home-link").addEventListener("click", () => {
  (document.getElementById("main").innerHTML = getRestaurantsTemplate()),
    getRestaurants();
});
