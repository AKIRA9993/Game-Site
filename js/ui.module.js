//main display data function
//details display data function\
//total of two functions for display only here
// UI Module - Handles all display operations
// UI Module - Handles all display operations
export default class UI {
    constructor() {
        this.gamesContainer = document.getElementById('games-container');
        this.detailsSection = document.getElementById('details-section');
        this.homeSection = document.getElementById('home-section');
    }

  // Display games list
displayGames(games) {
    let cardsHTML = '';

    games.forEach(game => {
        cardsHTML += `
            <div class="game-card" data-game-id="${game.id}">
                <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <div class="card-header-row">
                        <h5 class="card-title">${game.title}</h5>
                        <button class="badge-free">Free</button>
                    </div>
                    <p class="card-text">${this.truncateText(game.short_description, 60)}</p>
                    <div class="card-footer-row">
                        <span class="card-genre">${game.genre}</span>
                        <span class="card-platform">${game.platform}</span>
                    </div>
                </div>
            </div>
        `;
    });

    this.gamesContainer.innerHTML = cardsHTML;
}
    // Display game details
    displayGameDetails(game) {
        const detailsHTML = `
            <div class="container py-5">
                <button class="btn-close-details btn btn-secondary mb-4">
                    <i class="fa-solid fa-arrow-left"></i> Back to Games
                </button>
                
                <div class="row">
                    <div class="col-md-4">
                        <img src="${game.thumbnail}" class="img-fluid rounded details-img" alt="${game.title}">
                    </div>
                    <div class="col-md-8">
                        <h2 class="details-title text-white mb-3">${game.title}</h2>
                        
                        <div class="details-info mb-4">
                            <p class="text-white"><strong>Category:</strong> <span class="badge bg-info">${game.genre}</span></p>
                            <p class="text-white"><strong>Platform:</strong> <span class="badge bg-secondary">${game.platform}</span></p>
                            <p class="text-white"><strong>Status:</strong> <span class="badge bg-success">${game.status}</span></p>
                            <p class="text-white"><strong>Developer:</strong> ${game.developer}</p>
                            <p class="text-white"><strong>Publisher:</strong> ${game.publisher}</p>
                            <p class="text-white"><strong>Release Date:</strong> ${game.release_date}</p>
                        </div>

                        <div class="details-description mb-4">
                            <h4 class="text-white">About Game</h4>
                            <p class="text-white-50">${game.description}</p>
                        </div>

                        <a href="${game.game_url}" target="_blank" class="btn btn-primary btn-lg">
                            Play Now <i class="fa-solid fa-gamepad"></i>
                        </a>
                    </div>
                </div>

                ${game.screenshots && game.screenshots.length > 0 ? `
                    <div class="screenshots-section mt-5">
                        <h4 class="text-white mb-4">Screenshots</h4>
                        <div class="row">
                            ${game.screenshots.map(screenshot => `
                                <div class="col-md-4 mb-3">
                                    <img src="${screenshot.image}" class="img-fluid rounded screenshot-img" alt="Screenshot">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${game.minimum_system_requirements ? `
                    <div class="system-requirements mt-5">
                        <h4 class="text-white mb-4">Minimum System Requirements</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="text-white"><strong>OS:</strong> ${game.minimum_system_requirements.os || 'N/A'}</p>
                                <p class="text-white"><strong>Processor:</strong> ${game.minimum_system_requirements.processor || 'N/A'}</p>
                                <p class="text-white"><strong>Memory:</strong> ${game.minimum_system_requirements.memory || 'N/A'}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="text-white"><strong>Graphics:</strong> ${game.minimum_system_requirements.graphics || 'N/A'}</p>
                                <p class="text-white"><strong>Storage:</strong> ${game.minimum_system_requirements.storage || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this.detailsSection.innerHTML = detailsHTML;
    }

    // Show details section, hide home section
    showDetailsSection() {
        this.homeSection.style.display = 'none';
        this.detailsSection.style.display = 'block';
        window.scrollTo(0, 0);
    }

    // Show home section, hide details section
    showHomeSection() {
        this.homeSection.style.display = 'block';
        this.detailsSection.style.display = 'none';
        window.scrollTo(0, 0);
    }

    // Show loading indicator
    showLoading() {
        this.gamesContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-white">Loading games...</p>
            </div>
        `;
    }

    // Truncate text helper
    truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }
}