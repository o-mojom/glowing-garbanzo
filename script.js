const products = [
  { id: 1, name: "Laptop", price: 500, img: "https://via.placeholder.com/100" },
  { id: 2, name: "Phone", price: 300, img: "https://via.placeholder.com/100" },
  { id: 3, name: "TV", price: 750, img: "https://via.placeholder,com/100" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const productContainer = document.getElementById("products");
  products.forEach((product) => {
    let productHTML = `<div class="product">
                             <img src="$ {product.img}" alt="${product.name}">
                             <h3>${product.name}</h3>
                             <p>$${product.price}</p>
                             <button onclick="addToCart(${product.id})">Add to Cart</button></div>`;
    productContainer.innerHTML += productHTML;
  });
}

function addToCart(id) {
  let product = products.find((p) => p.id === id);
  let cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cart-count").innerText = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

function toggleCart() {
  const cartElement = document.getElementById("cart");
  cartElement.style.display =
    cartElement.style.display === "block" ? "none" : "block";
  displayCart();
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `<li>${item.name} (x${item.quantity}) -$${
      item.price * item.quantity
    }
                        <button onclick="removeFromCart(${
                          item.id
                        })"> X </button></li>`;
  });

  cartTotal.innerText = total.toFixed(2);
}

function removeFomCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
  diplayCart();
}

displayProducts();
updateCart();