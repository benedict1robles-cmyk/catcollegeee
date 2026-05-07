const products = [
  {
    id: 1,
    name: "Backpack",
    price: 39.99,
    image: "🎒"
  },
  {
    id: 2,
    name: "Camera",
    price: 299.99,
    image: "📷"
  },
  {
    id: 3,
    name: "Sports Shoes",
    price: 69.99,
    image: "👟"
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function displayProducts(filteredProducts = products){

  const productList = document.getElementById("product-list");

  productList.innerHTML = "";

  filteredProducts.forEach(product => {

    const inCart = cart.find(item => item.id === product.id);

    productList.innerHTML += `
      <div class="product-card">

        <div class="product-image">
          ${product.image}
        </div>

        <h3>${product.name}</h3>

        <div class="price">
          $${product.price.toFixed(2)}
        </div>

        <button
          class="add-btn"
          onclick="addToCart(${product.id})"
          ${inCart ? "disabled" : ""}
        >
          ${inCart ? "Already in Cart" : "Add to Cart"}
        </button>

      </div>
    `;
  });
}


function addToCart(id){

  const product = products.find(product => product.id === id);

  cart.push({
    ...product,
    quantity: 1
  });

  updateCart();
}


function updateCart(){

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  if(cart.length === 0){

    cartItems.innerHTML = `
      <p class="empty">Your cart is empty.</p>
    `;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {

    const subtotal = item.price * item.quantity;

    total += subtotal;
    totalItems += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">

        <h4>${item.name}</h4>

        <p>Price: $${item.price.toFixed(2)}</p>

        <p class="subtotal">
          Subtotal: $${subtotal.toFixed(2)}
        </p>

        <div class="qty-controls">

          <button
            class="qty-btn"
            onclick="changeQuantity(${item.id}, -1)"
          >
            -
          </button>

          <span>${item.quantity}</span>

          <button
            class="qty-btn"
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>

        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${item.id})"
        >
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  cartCount.textContent = totalItems;

  localStorage.setItem("cart", JSON.stringify(cart));

  displayProducts();
}


function changeQuantity(id, change){

  const item = cart.find(item => item.id === id);

  item.quantity += change;

  if(item.quantity <= 0){
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}


function removeItem(id){

  cart = cart.filter(item => item.id !== id);

  updateCart();
}


function clearCart(){

  cart = [];

  updateCart();
}


function checkout(){

  if(cart.length === 0){

    alert("Your cart is empty!");

    return;
  }

  alert("Checkout successful!");
}


document
  .getElementById("search")
  .addEventListener("input", function(){

    const value = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);
  });


displayProducts();
updateCart();