const prompt = require('prompt-sync')();
let currentScene = 'init';

const userChoice = (options, str) => {
    let userInput = '';
    
    while (true) {
        userInput = prompt('> ');
        
        if (userInput.toUpperCase() === 'A' && options >= 1) {
            return 'A';
        }
        else if (userInput.toUpperCase() === 'B' && options >= 2) {
            return 'B';
        }
        else if (userInput.toUpperCase() === 'C' && options >= 3) {
            return 'C';
        }
        else if (userInput.toUpperCase() === 'D' && options >= 4) {
            return 'D';
        }
        else if (userInput.toUpperCase() === 'E' && options >= 5) {
            return 'E';
        }
        else if (userInput.toLowerCase() === 'quit game' || userInput.toLowerCase() === 'quit') {
            currentScene = 'end';
            return 'end';
        }
        else if (str === true) {
            return userInput;
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

// Displays important ship data
const displayStatus = () => {
    console.clear()
    
    let lineSeparator = '';
    for (let i = 0; i < 50; i++) {
        lineSeparator += '-';
    }
    
    console.log(lineSeparator);
    console.log(gameData.shipName);
    console.log(`Location: ${gameData.shipLocation}`);
    console.log(lineSeparator);
    console.log();
}

// Game function
const game = () => {
    switch (currentScene) {
        case 'init':
            console.clear();
            console.log('You are a pirate captain sailing the high seas with your crew in search of plunder and glory.');
            console.log('At any time throughout the game, you can say "quit game" to exit.\n'); 
            console.log('What is the name of your ship?');
            
            let choiceInit = userChoice(0, true);
            if (choiceInit === 'end')
                break;
            else {
                gameData.shipName = choiceInit;
                currentScene = 'start';
                break;
            }
        case 'start':
            displayStatus();
            console.log('You are currently anchored off the coast of an island port. What do you instruct your crew to do?');
            console.log('(A) Go out to sea.');
            console.log('(B) Dock at the port for supplies.\n');
            
            let choiceStart = userChoice(2, false);

            if (choiceStart === 'A') {
                gameData.shipLocation = 'Out at sea';
                currentScene = 'atSea';
            }
            else if (choiceStart === 'B') {
                gameData.shipLocation = 'Docked at port';
                currentScene = 'atPort';
            }

            break;
        case 'atSea':
            displayStatus();
            console.log('You and your crew have returned to the open seas in search of a merchant ship to steal from.');
            
            currentScene = 'end';
            break;
        case 'atPort':
            displayStatus();
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
