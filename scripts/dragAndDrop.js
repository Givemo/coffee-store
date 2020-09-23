function addDnDHandlers() {
  let coffeeimages = document.getElementsByClassName("productarticlewide");

  let shoppingCartDropzone = document.getElementById("shoppingcart");

  let shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

  class Cart {
    constructor() {
      this.coffees = new Array();
    }
  }

  class Coffee {
    constructor(id, price) {
      this.coffeeId = id;
      this.price = price;
    }
  }

  let currentCart = null;

  currentCart = JSON.parse(localStorage.getItem("cart"));

  if (!currentCart) {
    createEmptyCart();
  }

  UpdateShoppingCartUI();

  currentCart.addCoffee = function (coffee) {
    currentCart.coffees.push(coffee);

    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  for (let i = 0; i < coffeeimages.length; i++) {
    coffeeimages[i].addEventListener(
      "dragstart",
      function (ev) {
        ev.dataTransfer.effectAllowed = "copy";
        ev.dataTransfer.setData("Text", this.getAttribute("id"));
      },
      false
    );
  }

  shoppingCartDropzone.addEventListener(
    "dragover",
    function (ev) {
      if (ev.preventDefault) ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      return false;
    },
    false
  );

  shoppingCartDropzone.addEventListener(
    "drop",
    function (ev) {
      if (ev.stopPropagation) ev.stopPropagation();
      let coffeeId = ev.dataTransfer.getData("Text");
      let element = document.getElementById(coffeeId);

      addCoffeeToShoppingCart(element, coffeeId);
      ev.stopPropagation();

      return false;
    },
    false
  );

  function addCoffeeToShoppingCart(item, id) {
    let price = item.getAttribute("data-price");

    let coffee = new Coffee(id, price);
    currentCart.addCoffee(coffee);

    UpdateShoppingCartUI();
  }

  function createEmptyCart() {
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify(new Cart()));
    currentCart = JSON.parse(localStorage.getItem("cart"));
  }

  function UpdateShoppingCartUI() {
    shoppingcart.innerHTML = "";
    for (let i = 0; i < currentCart.coffees.length; i++) {
      let liElement = document.createElement("li");
      liElement.innerHTML = `${currentCart.coffees[i].coffeeId} ${currentCart.coffees[i].price}`;
      shoppingcart.appendChild(liElement);
    }
  }
}

document.addEventListener("DOMContentLoaded", addDnDHandlers, false);
