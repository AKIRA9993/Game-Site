//class for details class methods
//so display details data class is in ui module 
//and here is the methods for that class
//we have two main sections in ui modules
//home and details
//this file will have the methods that will deal with the two sections
//the details page will have display none by default
//then when user click on details button
//the details page will be displayed
//and the home page will be hidden
//and the details methods are gonna be on ready




// Details Module - Handles details page specific functionality
export default class Details {
    constructor(ui, gamesAPI) {
        this.ui = ui;
        this.gamesAPI = gamesAPI;
    }

    // Show game details by ID
    async showGameDetails(gameId) {
        // Show loading in details section
        this.ui.detailsSection.innerHTML = `
            <div class="container text-center py-5">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-white">Loading game details...</p>
            </div>
        `;
        
        // Switch to details view
        this.ui.showDetailsSection();
        
        // Fetch game details
        const gameDetails = await this.gamesAPI.getGameDetails(gameId);
        
        if (gameDetails) {
            // Display game details
            this.ui.displayGameDetails(gameDetails);
            
            // Add close button listener
            this.attachCloseListener();
        } else {
            this.ui.showHomeSection();
        }
    }

    // Attach close button listener
    attachCloseListener() {
        const closeBtn = document.querySelector('.btn-close-details');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.ui.showHomeSection();
            });
        }
    }
}