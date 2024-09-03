import { menuArray } from "./data.js";

const container = document.getElementById("container");
const orderDiv = document.querySelector("#order-div");

// Add Items to menu
const menuItemList = () => {
  return menuArray
    .map((item) => {
      return ` 
      <div class="container-item">
        <p class="emoji-food">${item.emoji}</p>
        <div class="menu-item ">
          <h2>${item.name}</h2>
          <p>${item.ingredients.join(", ")}</p>
          <p>Price: $${item.price}</p>
        </div>
        <button class="add-btn" id=${item.id}>+</button>
      </div>
              `;
    })
    .join("");
};

container.innerHTML = menuItemList();

// Add items to order
const addBtn = document.getElementsByClassName("add-btn");

for (let btn of addBtn) {
  btn.addEventListener("click", addItemOrder);
}

function addItemOrder(e) {
  // Get the ID of the clicked button
  const idItem = e.target.id;

  // Disable btn
  e.target.disabled = true;

  // Generate the HTML for the order item
  const htmlOrder = `
  <div class="order-item">
      <h2>Your Order</h2>
      <div>
        <h3>${menuArray[idItem].name}</h3>
        <button>remove</button>
        <p>PRICE</p>
      </div>
      <h3>$${menuArray[idItem].price}</h3>
  </div>
  <h2>Total price:<span>PRICE</span></h2>
<button>Complete order</button>

  `;
  orderDiv.innerHTML += htmlOrder;
}

//  create order html
