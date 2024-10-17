// API URL
const apiURL = 'http://localhost:3000/api/teddies';

// Fonction pour récupérer les teddies de l'API et les afficher
async function getTeddies() {
    try {
        const response = await fetch(apiURL);
        const teddies = await response.json();

        const teddiesContainer = document.getElementById('teddies-container');

        // Parcourir les teddies et générer le HTML pour chaque ours
        teddies.forEach(teddy => {
            const teddyCard = document.createElement('div');
            teddyCard.classList.add('teddy-card');

            teddyCard.innerHTML = `
                <a href="produits.html?_id=${teddy._id}"><img src="${teddy.imageUrl}" alt="${teddy.name}"></a>
                <h3>${teddy.name}</h3>
                <p>${(teddy.price / 100).toFixed(2)} €</p>
            `;

            teddiesContainer.appendChild(teddyCard);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des teddies:', error);
    }
}

// Appel de la fonction lors du chargement de la page
window.onload = getTeddies;







