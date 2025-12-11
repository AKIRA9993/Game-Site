// Main controller - Initialize and coordinate all modules
import Games from './games.module.js';
import UI from './ui.module.js';
import Details from './details.module.js';

// Storage for instances
let gamesAPI;
let ui;
let detailsModule;

// Storage for current state
let currentGames = [];
let currentCategory = 'mmorpg';

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Initialize application
function initApp() {
    // Create instances
    gamesAPI = new Games();
    ui = new UI();
    detailsModule = new Details(ui, gamesAPI);
    
    // Load default category
    loadGames(currentCategory);
    
    // Setup navigation
    setupNavigation();
}

// Setup category navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get category from data attribute or text content
            const category = this.getAttribute('data-category') || this.textContent.toLowerCase().trim();
            currentCategory = category;
            
            // Load games for selected category
            loadGames(category);
        });
    });
}

// Load games by category
async function loadGames(category) {
    // Show loading
    ui.showLoading();
    
    // Fetch games from API
    const games = await gamesAPI.getGamesByCategory(category);
    
    // Store games
    currentGames = games;
    
    // Display games
    ui.displayGames(games);
    
    // Add click event listeners to game cards
    attachGameCardListeners();
}

// Attach click listeners to game cards
function attachGameCardListeners() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game-id');
            detailsModule.showGameDetails(gameId);
        });
    });
}