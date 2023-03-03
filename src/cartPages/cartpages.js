import { getRestaurants } from "../restaurants/restaurants";

export function getCartTemplate() {
  return ` <h1>Cart</h1>`;
}

export const displayItemsFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsHtml = cart
    .map((cartItem) => {
      const item = cartItem.item;
      return `
      <tr>
        <td>${item.name} &nbsp;</td>
        <td>${item.topping} &nbsp;</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><button data-id="${
          cartItem.id
        }" class="remove-item-btn">Remove</button></td>
      </tr>
    `;
    })
    .join("");

  const totalPrice = cart.reduce(
    (acc, cartItem) => acc + cartItem.item.price,
    0
  );

  const cartTemplate = `
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
      <tbody>
        ${cartItemsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total</td>
          <td>$${totalPrice.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    <br>
    <div style="text-align: center;">
      <button id="checkout-btn">Checkout</button>
    </div>
  `;
  document.getElementById("main").innerHTML = cartTemplate;

  const removeItemBtns = document.querySelectorAll(".remove-item-btn");
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.id;
      removeItemFromCart(itemId);
      window.location.hash || "";
    });
  });
};

document.getElementById("cart-link").addEventListener("click", (event) => {
  event.preventDefault();
  displayItemsFromLocalStorage();
});

document.getElementById("home-link").addEventListener("click", () => {
  (document.getElementById("main").innerHTML = getRestaurantDetailsTemplate()),
    getRestaurants();
});

function removeItemFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);
  if (itemIndex >= 0) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
