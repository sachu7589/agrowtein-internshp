let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = products.map(product => `
      <div class="product">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <a href="product.html?id=${product.id}">View Details</a>
      </div>
    `).join('');

    updateCartCount();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function addToCart(productId) {
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
  } else {
    alert('Product already in cart!');
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

fetchProducts();
