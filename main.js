import { menuArray } from "./data.js";

const container = document.getElementById("container");
const orderDiv = document.querySelector("#order-div");
const cardDetailsForm = document.getElementById("cardDetailsForm");
const modalFormOpen = document.getElementById("modal");

// Render menu items
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
        <button class="add-btn btn-${item.id}" data-id="${item.id}">+</button>
      </div>`;
    })
    .join("");
};

container.innerHTML = menuItemList();

// Basket to manage state of order
let basketItems = [];
let totalPrice = 0;

// Select buttons
const addBtns = document.getElementsByClassName("add-btn");

// Method to add an item to the basket
const addItem = (e) => {
  const itemId = e.target.getAttribute("data-id");
  const item = menuArray[itemId];

  // Render item only if it's not already in the basket
  if (!basketItems.includes(item.name)) {
    renderOrder(item);
    basketItems.push(item.name);
    totalPrice += item.price;

    // Render total price only once when the first item is added
    if (basketItems.length === 1) {
      renderTotalPrice();
    }

    // Update total price in the DOM
    document.getElementById("total-price-id").textContent = `$${totalPrice}`;

    // Disable the button after adding the item
    e.target.disabled = true;
  }
};

// Attach event listeners to all buttons
for (let btn of addBtns) {
  btn.addEventListener("click", addItem);
}

const renderOrder = (item) => {
  // Render the order item
  orderDiv.innerHTML += `
      <div class="order-item" id="order-item-${item.id}">
        <div>
          <h3>${item.name}</h3>
          <button class="remove-btn" data-id="${item.id}">remove</button>
          <p>PRICE: $${item.price}</p>
        </div>
      </div>
    `;

  // After rendering, re-attach event listeners to all remove buttons
  updateRemoveButtons();
};

// Attach event listeners to all remove buttons
const updateRemoveButtons = () => {
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    const itemId = btn.getAttribute("data-id");
    btn.addEventListener("click", () => removeItem(itemId));
  });
};

// Remove item from order
const removeItem = (itemId) => {
  // Remove the item from the DOM
  const itemElement = document.querySelector(`#order-item-${itemId}`);
  if (itemElement) {
    itemElement.remove();
  }

  // Remove the item from the basket
  basketItems = basketItems.filter((item) => item !== menuArray[itemId].name);

  // Reactivate the "add" button by enabling it
  const btnElement = document.querySelector(`.btn-${itemId}`);
  if (btnElement) {
    btnElement.disabled = false; // Enable the button
  }

  // Update the total price
  totalPrice -= menuArray[itemId].price;
  document.getElementById("total-price-id").textContent = `$${totalPrice}`;

  // Remove total price section if basket is empty
  if (basketItems.length === 0) {
    const totalPriceElement = document.querySelector("#total-price-element");
    if (totalPriceElement) {
      totalPriceElement.remove();
    }
  }
};

// Render total price and "Complete Order" button
const renderTotalPrice = () => {
  const totalPriceElement = document.createElement("div");
  totalPriceElement.id = "total-price-element";
  totalPriceElement.innerHTML = `
    <h3>Total price: <span id='total-price-id'>$${totalPrice}</span></h3>
    <button id="complete-order-btn">Complete Order</button>
  `;
  orderDiv.insertAdjacentElement("afterend", totalPriceElement);

  document
    .getElementById("complete-order-btn")
    .addEventListener("click", completeOrder);
};

// Complete Order

function completeOrder() {
  modalFormOpen.style.display = "block";
}
//  Handle Form

cardDetailsForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(cardDetailsForm);

  const name = formData.get("cardName");
  console.log(name);
  orderDiv.innerHTML = `<h2 id="thankYouMsg">Thanks, ${name}! Your order is on the way</h2>`;
  modalFormOpen.style.display = "none";
});
