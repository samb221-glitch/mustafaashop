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
function clearCart() {
  cart = [];
  saveCart();
  displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
  const receipt = document.getElementById('receipt');
  const totalElement = document.getElementById('total');
  const storedCart = localStorage.getItem('cart');
  let total = 0;

  if (storedCart) {
    const cart = JSON.parse(storedCart);

    const grouped = {};
    cart.forEach(item => {
      if (grouped[item.product]) {
        grouped[item.product].quantity += 1;
      } else {
        grouped[item.product] = {
          price: item.price,
          quantity: 1
        };
      }
    });

    for (const [product, data] of Object.entries(grouped)) {
      const li = document.createElement('li');
      const subtotal = data.price * data.quantity;
      li.textContent = `${product} x${data.quantity} — ${subtotal.toLocaleString()} FCFA`;
      receipt.appendChild(li);
      total += subtotal;
    }

    totalElement.textContent = `Total : ${total.toLocaleString()} FCFA`;
    localStorage.removeItem('cart');
  } else {
    receipt.innerHTML = '<li>Votre panier était vide.</li>';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('request-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const jersey = document.getElementById('jersey').value.trim();
      const message = document.getElementById('message').value.trim();

      const fullMessage = `Bonjour Mustafaa Shop, je m'appelle ${name} et je cherche le maillot suivant : ${jersey}. ${message ? 'Détails : ' + message : ''}`;
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappURL = `https://wa.me/221785257421?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    });
  }
});
