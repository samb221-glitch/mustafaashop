let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  alert(`${product} ajouté au panier.`);
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

function displayCart() {
  loadCart();
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  let total = 0;

  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - ${item.price} FCFA `;

    // Ajout du bouton "Supprimer"
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Supprimer';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = function() {
      removeFromCart(index);
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });

  totalElement.textContent = `Total : ${total} FCFA`;
}

if (document.getElementById('cart-items')) {
  displayCart();
}
