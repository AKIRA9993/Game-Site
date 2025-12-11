//responsible for the background section
//will have two backgrounds
//one displayed for main page
//other displayed for details page 
//the details background page will have display none
//and when user click on details button
//the details background will be displayed
//and the main background will be hidden


//Games api module
//handles all api calls
// Games API Module - Handles all API calls
// Games API Module - Handles all API calls
export default class Games {
    constructor() {
        this.apiKey = '3b6e5c14d3msh311e7508424c43dp1f187ajsn51ca6be6721d';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
    }

    // Get games by category
    async getGamesByCategory(category) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching games:', error);
            alert('Failed to load games. Please try again!');
            return [];
        }
    }

    // Get single game details by ID
    async getGameDetails(gameId) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching game details:', error);
            alert('Failed to load game details. Please try again!');
            return null;
        }
    }
}