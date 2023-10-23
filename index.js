if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeBtn = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeBtn.length; i++) {
    var btn = removeBtn[i];
    btn.addEventListener("click", (e) => {
      var btnClicked = e.target;
      var parent = btnClicked.parentElement.parentElement;
      parent.remove();
      updateCartTotal();
    });
  }
  var quantityInput = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChange);
  }
  var addToCart = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCart.length; i++) {
    var button = addToCart[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function quantityChange(e) {
  var input = e.target;
  if (isNaN(input) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(e) {
  var button = e.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  cartItems.append(cartRow);
  var cartItemsName = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText == title) {
      alert("this item is already in your cart ");
      return;
    }
  }
  var cartContent = `
  <div class="cart-row">
  <div class="cart-item cart-column">
    <img
      class="cart-item-image"
      src="${imageSrc}"
      width="100"
      height="100" />
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="2" />
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>
</div>
</div>
  `;
  cartRow.innerHTML = cartContent;
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeBtn);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChange);
}
function updateCartTotal() {
  var cartItemsContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemsContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quntElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quntElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
