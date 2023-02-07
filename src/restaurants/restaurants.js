clickRestaurant = (e) => {
  fetch(
    `https://private-anon-af35c927af-pizzaapp.apiary-mock.com/restaurants/2`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      if (result == true) {
        window.location.href = "/dist/index.html";
        alert("You are in!");
      } else {
        //window.location.href = "/dist/index.html";
        alert("Not bien...");
      }
    });
};

function getRestaurants() {
  fetch(
    "http://private-anon-af35c927af-pizzaapp.apiary-mock.com/restaurants/",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      convertJsonToHtml(mockRestaruantsResult());
    });

  //console.log(window.location.hash);
}

function mockRestaruantsResult() {
  let mock = [
    {
      id: 1,
      name: "Pizza Heaven",
      address1: "Kungsgatan 1",
      address2: "111 43 Stockholm",
      latitude: 59.336078,
      longitude: 18.071807,
    },
    {
      id: 2,
      name: "Pizzeria Apan",
      address1: "LĂĽngholmsgatan 34",
      address2: "117 33 Stockholm",
      latitude: 59.315709,
      longitude: 18.033507,
    },
    {
      id: 3,
      name: "Pizzeria Apan",
      address1: "LĂĽngholmsgatan 34",
      address2: "117 33 Stockholm",
      latitude: 59.315709,
      longitude: 18.033507,
    },
    {
      id: 4,
      name: "Pizzeria Apan",
      address1: "LĂĽngholmsgatan 34",
      address2: "117 33 Stockholm",
      latitude: 59.315709,
      longitude: 18.033507,
    },
    {
      id: 5,
      name: "Pizzeria Apan",
      address1: "LĂĽngholmsgatan 34",
      address2: "117 33 Stockholm",
      latitude: 59.315709,
      longitude: 18.033507,
    },
  ];
  return mock;
}

function convertJsonToHtml(restaurants) {
  div = document.createElement("div");
  div.className = "main-button";

  for (var i = 0; i < restaurants.length; i++) {
    if (i > 0) {
      pre = document.createElement("a");
      pre.className = "a";
      pre.innerHTML = " | ";
      div.appendChild(pre);
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "button button";
    button.innerHTML = restaurants[i].name;
    button.addEventListener("click", clickRestaurant);
    div.appendChild(button);
  }
  document.getElementById("main").appendChild(div);
}
