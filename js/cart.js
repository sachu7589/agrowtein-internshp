let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchCartItems() {
  const cartContainer = document.getElementById('cart-container');

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const promises = cart.map(id => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()));
  const products = await Promise.all(promises);

  let total = 0;
  cartContainer.innerHTML = products.map(product => {
    total += product.price;
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}">
        <div>
          <h3>${product.title}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="removeFromCart(${product.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  cartContainer.innerHTML += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
}

function removeFromCart(productId) {
  cart = cart.filter(id => id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  fetchCartItems();
}

fetchCartItems();
