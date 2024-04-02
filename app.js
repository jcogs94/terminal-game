const prompt = require('prompt-sync')();
let currentScene = 'init';

// Validates user input to ensure they do not want to quit
const validateInput = input => {
    if (input.toLowerCase() === 'quit game' || input.toLowerCase() === 'quit') {
        gameRunning = false;
        return input;
    }
    else
        return input;
}

const userChoice = () => {
    let validInput = false;
    let userInput = '';
    
    while (validInput === false) {
        userInput = prompt('> ');
        if (userInput.toUpperCase() === 'A') {
            return 'A';
        }
        else if (userInput.toUpperCase() === 'B') {
            return 'B';
        }
        else if (userInput.toLowerCase() === 'quit game' || userInput.toLowerCase() === 'quit') {
            currentScene = 'end';
            break;
        }
        else {
            console.log('Invalid input, try again.');
        }
    }
}

// Data object for the game
const gameData = {
    shipName: '',
    shipLocation: 'Off the coast of port'
}

const displayStatus = () => {
    console.clear()
    console.log(gameData.shipName);
    console.log(`Location: ${gameData.shipLocation}`);
    console.log('\n');
}

// Game function
const game = () => {
    switch (currentScene) {
        case 'init':
            console.clear();
            console.log('You are a pirate captain sailing the high seas with your crew in search of plunder and glory.');
            console.log('At any time throughout the game, you can say "quit game" to exit.\n'); 
            console.log('What is the name of your ship?');
            gameData.shipName = validateInput(prompt('> '));
            currentScene = 'start';
            break;
        case 'start':
            displayStatus();
            console.log('You are currently anchored off the coast of an island port. What do you instruct your crew to do?');
            console.log('(A) Go out to sea.');
            console.log('(B) Dock at the port for supplies.\n');
            
            let validInput = false;
            let userInput = '';
            while (validInput === false) {
                userInput = prompt('> ');
                if (userInput.toUpperCase() === 'A') {
                    validInput = true;
                    currentScene = 'atSea';
                }
                else if (userInput.toUpperCase() === 'B') {
                    validInput = true;
                    currentScene = 'atPort';
                }
                else if (userInput.toLowerCase() === 'quit game' || userInput.toLowerCase() === 'quit') {
                    currentScene = 'end';
                    break;
                }
                else {
                    console.log('Invalid input, try again.');
                }
            }

            break;
        case 'end':
            gameRunning = false;
            break;
        default:
            break;
    }
}

let gameRunning = true;
while (gameRunning) {
    game();
}
