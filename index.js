var removeBtn = document.getElementsByClassName("btn-danger");

for (var i = 0; i < removeBtn.length; i++) {
  var btn = removeBtn[i];
  btn.addEventListener("click", (e) => {
    var btnClicked = e.target;
    var parent = btnClicked.parentElement.parentElement;
    //parent.remove();
    updateCartTotal();
  });
}

function updateCartTotal() {
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRows = document.getElementsByClassName("cart-row");
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quntElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quntElement.value;
    console.log(quantity);
  }
}
