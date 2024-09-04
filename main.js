import { menuArray } from "./data.js";

const container = document.getElementById("container");

const menuItemList = () => {
  return menuArray
    .map((item) => {
      return ` 
      <div class="container-item">
        <p class="emoji-food">${item.emoji}</p>
        <div class="menu-item">
          <h2>${item.name}</h2>
          <p>${item.ingredients.join(", ")}</p>
          <p>Price: $${item.price}</p>
        </div>
        <button class="add-btn" id="${item.id}">+</button>
      </div>`;
    })
    .join("");
};

//  Add items to container
container.innerHTML = menuItemList();

//  basket to manage state of order

let basketItems = [];
let totalPrice = 0;
let counter = 0

// Select btns
const addBtns = document.getElementsByClassName("add-btn");

// Method to add an item to the basket
const addItem = (e) => {
  const item = menuArray[e.target.id];
  
  

  //  render only one item
  !basketItems.includes(item.name) ? renderOrder(item) : "";

  basketItems.push(item.name);

  totalPrice += item.price;

  // render only one total price div
  basketItems.length === 1 ? renderTotalPrice() : "";

  // updates total price
  document.getElementById("total-price-id").textContent = `$${totalPrice}`;

  // updates counter


};

for (let btn of addBtns) {
  btn.addEventListener("click", addItem);
}

// Method to update the DOM
const renderOrder = (item) => {
  const orderDiv = document.querySelector("#order-div");

  orderDiv.innerHTML += `
      <div class="order-item" id="order-item-${item.id}">
        <div>
          <h3>${item.name}</h3>
          <button class="remove-btn" data-id="${item.id}">remove</button>
          <p>PRICE: $${item.price}</p>
        </div>
      </div>
    `;
};

const renderTotalPrice = () => {
  const totalPriceElement = document.createElement("div");
  totalPriceElement.innerHTML = `
  <h3>Total price:<span id='total-price-id'>PRICE</span></h3>
  <button>Complete Order</button>
  `;
  const orderDiv = document.querySelector("#order-div");
  orderDiv.insertAdjacentElement("afterend", totalPriceElement);
};
