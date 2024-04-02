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
    shipLocation: 'Off the coast of port',
    wantedLevel: 0,
    shipHealth: 30,
    shipAttackPower: 5
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
    console.log(`Wanted Level: ${gameData.wantedLevel}`);
    console.log(`Health: ${gameData.shipHealth}`);
    console.log(`Attack Power: ${gameData.shipAttackPower}`);
    console.log(lineSeparator);
    console.log();
}

const merchantEvent = () => {
    let merchantVesselHealth = 15;
    let merchantVesselAttack = 1;

    console.log('You have encountered a merchant vessel.\n');
    console.log(`Merchant vessel:\nHealth: ${merchantVesselHealth}\nAttack: ${merchantVesselAttack}\n`);

    while (merchantVesselHealth > 0) {
        console.log('Would you like to:');
        console.log('(A) Attempt to board');
        console.log('(B) Fire at the vessel');

        let merchantChoice = userChoice(2, false);
        if (merchantChoice === 'end')
            return;
        else if (merchantChoice === 'A') {

        }
        else if (merchantChoice === 'B') {
            console.log('\nYou tell your crew to open fire on the merchant vessel.');

            merchantVesselHealth -= gameData.shipAttackPower;
            if (merchantVesselHealth <= 0) {
                console.log('The merchant vessel sunk as a result of being fired upon.');
                console.log('The crew is upset.\n');
            }
            else {
                console.log(`\n${gameData.shipName} fires a volley at the merchant ship, leaving its health at ${merchantVesselHealth}.`);
                gameData.shipHealth -= merchantVesselAttack;
                console.log(`The merchant vessel fires back at ${gameData.shipName}, leaving its health at ${gameData.shipHealth}.\n`);
            }
        }
    }
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
            console.log('(B) Dock at the port for supplies.');
            
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
            console.log('You and your crew have returned to the open seas in search of a merchant ship to steal from...\n');

            let continueAtSea = true;
            while (continueAtSea) {
                let shipEncountered = Math.random();
                if (shipEncountered <= gameData.wantedLevel) {
                    console.log('Royal Navy ship encountered.');
                }
                else {
                    merchantEvent();
                }

                if (currentScene === 'end')
                    break;

                console.log('Would you like to continue looking for merchant ships at sea?');
                console.log('(A) Yes');
                console.log('(B) No');
                
                let atSeaChoice = userChoice(2, false);
                if (atSeaChoice === 'end')
                    break;
                else if (atSeaChoice === 'A')
                    continue;
                else
                    continueAtSea = false;
            }

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
