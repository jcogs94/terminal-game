const prompt = require('prompt-sync')();
let currentScene = 'start';

// Validates user input to ensure they do not want to quit
const validateInput = input => {
    if (input.toLowerCase() === 'quit game' || input.toLowerCase() === 'quit') {
        gameRunning = false;
    }
    else
        return input;
}

// Data object for the game
const gameData = {
    shipName: ''
}

// Game function
const game = () => {
    switch (currentScene) {
        case 'start':
            console.log('You are a pirate captain sailing the high seas with your crew in search of plunder and glory.');
            console.log('At any time throughout the game, you can say "quit game" to exit.\n'); 
            console.log('What is the name of your ship?');
            gameData.shipName = validateInput(prompt('> '));
            break;
        default:
            break;
    }
}

// let userInput = '';

let gameRunning = true;
while (gameRunning) {
    game();
}
