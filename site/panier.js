// récuperer les datas du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// affichage du panier dans la page
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cartItemsDiv.innerHTML = `
            <h2>Votre panier :</h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Couleur</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map((item, index) => `
                        <tr>
                            <td><img src="${item.imageUrl}" alt="${item.name}"></td>
                            <td>${item.name}</td>
                            <td>${item.selectedColor}</td>
                            <td>${item.quantity}</td>
                            <td>${(item.price / 100).toFixed(2)} €</td>
                            <td><button onclick="removeFromCart(${index})">Supprimer</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    alert("Merci pour votre commande !");
}

// suppression d'un articlee du panier
function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); 
}

// Affichage du panier
displayCartItems();

// envoi commande
async function sendOrder(orderData) {
    try {
        const response = await fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        console.log('Commande réussie :', result);
        clearCart();

        // redirect vers la page de confirmation avec les informations de la commande
        window.location.href = `confirmation.html?orderId=${result.orderId}&contact=${JSON.stringify(result.contact)}&products=${JSON.stringify(result.products)}`;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande :', error);
    }
}

// form pour la commande
document.getElementById('order-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    };

    const products = cart.map(item => item.id);

    const orderData = { contact, products };

    // envoyer la commande
    sendOrder(orderData);
});
