import { fetchData } from "../helpers.js";

export function getMenuTemplate() {
  return ` <h1>Menu</h1>`;
}

export function getRestaurantMenu(id) {
  fetchData(
    `https://private-anon-7231255228-pizzaapp.apiary-mock.com/restaurants/${id}/menu?category=Pizza&orderBy=rank`
  ).then((result) => {
    const menuBody = document.getElementById("main");

    let totalPrice = 0;
    let totalQuantity = 0;

    result.forEach((item) => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const topping = document.createElement("td");
      const price = document.createElement("td");
      const addToCartBtn = document.createElement("button");

      name.innerText = item.name;

      topping.innerText = item.topping?.join(", ") || " ";
      price.innerText = ` $ ${item.price}`;
      addToCartBtn.innerText = "Add to cart";

      addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!Array.isArray(cart)) {
          cart = [];
        }

        //get id from URL
        const id = window.location.hash.split("/")[1];
        console.log("the id is ", id);

        const menuItem = { item, id };
        cart.push(menuItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        totalQuantity++;
        totalPrice += item.price;

        alert(`${item.name} has been added to your cart!`);
        console.log(menuItem);

        // Update total row
        totalQuantityCol.innerText = `Total quantity: ${totalQuantity}`;
        totalPriceCol.innerText = `Total price: $${totalPrice.toFixed(2)}`;
      });
      row.appendChild(name);
      row.appendChild(topping);
      row.appendChild(price);
      row.appendChild(addToCartBtn);
      menuBody.appendChild(row);
    });

    // Create total row
    const totalRow = document.createElement("tr");
    const totalQuantityCol = document.createElement("td");
    const totalQuantityText = document.createTextNode(
      `Total quantity: ${totalQuantity}`
    );
    const totalPriceCol = document.createElement("td");
    const totalPriceText = document.createTextNode(
      `Total price: $${totalPrice.toFixed(2)}`
    );

    totalQuantityCol.setAttribute("colspan", "2");
    totalPriceCol.setAttribute("colspan", "2");

    totalQuantityCol.appendChild(totalQuantityText);
    totalPriceCol.appendChild(totalPriceText);

    totalRow.appendChild(totalQuantityCol);
    totalRow.appendChild(totalPriceCol);
    menuBody.appendChild(totalRow);
  });
}
