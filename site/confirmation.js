// récuperer les paramètres dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const contact = JSON.parse(urlParams.get('contact'));
const products = JSON.parse(urlParams.get('products'));

// récupérer la div pour afficher les détails de la commande
const confirmationDetailsDiv = document.getElementById('confirmation-details');

// affichage des détails de la commande dans la div
confirmationDetailsDiv.innerHTML = `
    <h2>Merci pour votre commande, ${contact.firstName} ${contact.lastName} !</h2>
    <p>Numéro de commande : ${orderId}</p>
    <h3>Détails du contact :</h3>
    <p>Adresse : ${contact.address}, ${contact.city}</p>
    <p>Email : ${contact.email}</p>

    <h3>Produits commandés :</h3>
    <ul>
        ${products.map(product => `
            <li>
                <img src="${product.imageUrl}" alt="${product.name}" style="width: 300px; border-radius: 10px;"/>
                <p><strong>${product.name}</strong></p>
                <p>Prix : ${(product.price / 100).toFixed(2)} €</p>
                <p>Description : ${product.description}</p>
            </li>
        `).join('')}
    </ul>
`;
