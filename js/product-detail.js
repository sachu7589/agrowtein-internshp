async function fetchProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
    `;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

fetchProductDetails();
