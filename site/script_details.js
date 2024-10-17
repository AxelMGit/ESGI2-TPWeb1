// API URL
const apiURL = 'http://localhost:3000/api/teddies';

async function getTeddyDetails() {
    // Récupérer les infos via l'url
    const params = new URLSearchParams(window.location.search);
    const teddyId = params.get('_id');  
    
    if (!teddyId) {
        console.error("Aucun ID de teddy trouvé dans l'URL");
        return;
    }

    try {
        // appel api
        const response = await fetch(`${apiURL}/${teddyId}`);
        const teddy = await response.json();

        // si appel valide, recup les infos
        if (teddy) {
            document.querySelector('.product-image img').src = teddy.imageUrl;
            document.querySelector('.product-details h2').textContent = teddy.name;
            document.querySelector('.product-details .description').textContent = teddy.description;
            document.querySelector('.product-details .price').textContent = `Prix : ${(teddy.price / 100).toFixed(2)} €`;

            // ajout options en fonction du produit
            const colorSelect = document.getElementById('colors');
            teddy.colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color.toLowerCase();
                option.textContent = color;
                colorSelect.appendChild(option);
            });
        } else {
            // si rien n'existe
            document.querySelector('.product-details').innerHTML = "<p>Ce teddy n'existe pas.</p>";
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du teddy:', error);
        document.querySelector('.product-details').innerHTML = "<p>Impossible de récupérer les détails du produit. Veuillez réessayer plus tard.</p>";
    }
}



// ajout au panier
function addToCart(teddy) {
    // recup du panier actuel depuis le localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // add au panier
    cart.push({
        id: teddy._id,
        name: teddy.name,
        price: teddy.price,
        imageUrl: teddy.imageUrl,
        quantity: parseInt(document.getElementById('quantity').value),
        selectedColor: document.getElementById('colors').value
    });

    // update du panier
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${teddy.name} a été ajouté au panier.`);
}

// bouton ajouter au panier
document.getElementById('add-to-cart').addEventListener('click', async function () {

    const params = new URLSearchParams(window.location.search);
    const teddyId = params.get('_id');

    const response = await fetch(`${apiURL}/${teddyId}`);
    const teddy = await response.json();

    addToCart(teddy);
});




// appel au chargement de la page
window.onload = getTeddyDetails;