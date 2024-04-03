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
    shipMaxHealth: 30,
    shipHealth: 30,
    shipAttackPower: 5,
    crewGold: 20
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
    console.log(`Wanted Level: ${gameData.wantedLevel.toFixed(1)}`);
    console.log(`Health: ${gameData.shipHealth}/${gameData.shipMaxHealth}`);
    console.log(`Attack Power: ${gameData.shipAttackPower}`);
    console.log(`Gold: ${gameData.crewGold}g`);
    console.log(lineSeparator);
    console.log();
}

const merchantEvent = () => {
    let merchantVesselHealth = 15;
    let merchantHealthInit = merchantVesselHealth;
    let merchantVesselAttack = 1;

    console.log('You have encountered a merchant vessel.\n');
    console.log(`Merchant vessel:\nHealth: ${merchantVesselHealth}\nAttack: ${merchantVesselAttack}\n`);

    while (merchantVesselHealth > 0 && gameData.shipHealth > 0) {
        console.log('Would you like to:');
        console.log('(A) Attempt to board');
        console.log('(B) Fire at the vessel');

        let merchantChoice = userChoice(2, false);
        if (merchantChoice === 'end')
            return;
        else if (merchantChoice === 'A') {
            if ((merchantVesselHealth / merchantHealthInit) <= .6) {
                merchantVesselHealth = 0;
                gameData.crewGold += 10;
                gameData.wantedLevel += .1;

                displayStatus();
                console.log('\nThe merchant vessel was successfully boarded. You plundered 10 gold.');
                console.log(`The crew of ${gameData.shipName} now has ${gameData.crewGold}g.\n`);
            }
            else {
                console.log('\nThe crew of the merchant vessel resists and prevents the boarding attempt.\n');
            }
        }
        else if (merchantChoice === 'B') {
            console.log('\nYou tell your crew to open fire on the merchant vessel.');

            merchantVesselHealth -= gameData.shipAttackPower;
            if (merchantVesselHealth <= 0) {
                gameData.wantedLevel += .1;

                displayStatus();
                console.log('The merchant vessel sunk as a result of being fired upon.');
                console.log('The crew is upset.\n');
            }
            else {
                console.log(`\n${gameData.shipName} fires a volley at the merchant ship, leaving its health at ${merchantVesselHealth}.`);
                gameData.shipHealth -= merchantVesselAttack;

                if (gameData.shipHealth <= 0) {
                    currentScene = 'end';
                    console.log(`The merchant vessel fires back at ${gameData.shipName}, causing it to sink.`);
                    console.log(`\n>>> GAME OVER <<<`);
                }
                else
                    console.log(`The merchant vessel fires back at ${gameData.shipName}, leaving its health at ${gameData.shipHealth}.\n`);
            }
        }
    }
}

const royalNavyEvent = () => {
    let navyVesselHealth = 40;
    let navyVesselAttack = 10;

    console.log('\nYou have encountered a royal navy vessel.\n');
    console.log(`Navy vessel:\nHealth: ${navyVesselHealth}\nAttack: ${navyVesselAttack}\n`);

    while (navyVesselHealth > 0 && gameData.shipHealth > 0) {
        console.log('Would you like to:');
        console.log('(A) Attempt to flee');
        console.log('(B) Fire at the vessel');

        let navyChoice = userChoice(2, false);
        if (navyChoice === 'end')
            return;
        else if (navyChoice === 'A') {
            displayStatus();
            navyVesselHealth = 0;
            console.log('\nYour crew manages to leave the area without being spotted.\n');
        }
        else if (navyChoice === 'B') {
            console.log('\nYou tell your crew to open fire on the navy vessel.');

            navyVesselHealth -= gameData.shipAttackPower;
            if (navyVesselHealth <= 0) {
                gameData.wantedLevel += .25;

                displayStatus();
                console.log('The navy vessel sunk as a result of being fired upon.');
                console.log('The crew is upset.\n');
            }
            else {
                console.log(`\n${gameData.shipName} fires a volley at the navy ship, leaving its health at ${navyVesselHealth}.`);
                gameData.shipHealth -= navyVesselAttack;

                if (gameData.shipHealth <= 0) {
                    currentScene = 'end';
                    console.log(`The navy vessel fires back at ${gameData.shipName}, causing it to sink.`);
                    console.log(`\n>>> GAME OVER <<<`);
                }
                else
                    console.log(`The navy vessel fires back at ${gameData.shipName}, leaving its health at ${gameData.shipHealth}.\n`);
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
                    royalNavyEvent();
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
                else if (atSeaChoice === 'A') {
                    displayStatus();
                    continue;
                }
                else if (atSeaChoice === 'B') {
                    continueAtSea = false;
                    currentScene = 'atPort';
                    console.log(`You have decided to have the crew bring ${gameData.shipName} back to port to resupply.`);
                }
            }

            break;
        case 'atPort':
            displayStatus();

            console.log(`After a long time at sea, ${gameData.shipName} returns safely to port.\n`);
            console.log('What would you like to do?');
            console.log('(A) Visit shipyard');
            console.log('(B) Lay low at the Inn');
            console.log('(C) Return to sea');
            
            let portChoice = userChoice(3, false);
            switch (portChoice) {
                case 'end':
                    break;
                case 'A':
                    currentScene = 'shipyard';
                    break;
                case 'B':
                    currentScene = 'inn';
                    break;
                case 'C':
                    currentScene = 'atSea';
                    break;
            }

            break;
        case 'shipyard':
            displayStatus();

            let repairCost = Math.ceil((gameData.shipMaxHealth - gameData.shipHealth) / 5) * 1;

            console.log('The shipyard worker welcomes you.');

            let shopping = true;
            let firstBuy = true;
            while (shopping) {
                if (firstBuy) {
                    firstBuy = false;
                    console.log('\n"What do you need?"');
                }
                else
                    console.log('\n"Anything else for you?"');
                
                if (repairCost === 0)
                    console.log(`(A) Repair ${gameData.shipName} - Unavailable, already at full health`);
                else
                    console.log(`(A) Repair ${gameData.shipName} - ${repairCost}g`);
                
                console.log(`(B) Upgrade cannons (+5 attack) - 10g`);
                console.log(`(C) Upgrade hull (+5 health) - 10g`);
                console.log(`(D) Return to port`);

                let shipyardChoice = userChoice(4, false);
                switch (shipyardChoice) {
                    case 'end':
                        shopping = false;
                        break;
                    case 'A':
                        if (repairCost === 0)
                            console.log(`\n"There's not anything else to repair! I could work on that hull if you'd like to upgrade it."`);
                        else if (gameData.crewGold >= repairCost) {
                            gameData.crewGold -= repairCost;
                            gameData.shipHealth = gameData.shipMaxHealth;
                            repairCost = 0;
                            console.log(`\n${gameData.shipName} has been fully repaired.`);
                            console.log(`Gold: ${gameData.crewGold}g`);
                        }
                        else {
                            console.log(`\nThe crew does not have enough money to repair ${gameData.shipName}.\nCurrent Gold: ${gameData.crewGold}g`);
                        }
                        break;
                    case 'B':
                        if (gameData.crewGold >= 10) {
                            gameData.crewGold -= 10;
                            gameData.shipAttackPower += 5;
                            console.log(`\nCannons upgraded.\nAttack now at: ${gameData.shipAttackPower}`);
                            console.log(`Gold: ${gameData.crewGold}g`);
                        }
                        else {
                            console.log(`\nThe crew does not have enough money to upgrade ${gameData.shipName}'s cannons.\nCurrent Gold: ${gameData.crewGold}g`);
                        }
                        break;
                    case 'C':
                        if (gameData.crewGold >= 10) {
                            gameData.crewGold -= 10;
                            gameData.shipMaxHealth += 5;
                            gameData.shipHealth += 5;
                            console.log(`\nHull upgraded.\nHealth: ${gameData.shipHealth}/${gameData.shipMaxHealth}`);
                            console.log(`Gold: ${gameData.crewGold}g`);
                        }
                        else {
                            console.log(`\nThe crew does not have enough money to upgrade ${gameData.shipName}'s hull.\nCurrent Gold: ${gameData.crewGold}g`);
                        }
                        break;
                    case 'D':
                        currentScene = 'atPort';
                        shopping = false;
                        break;
                }
            }

            break;
        case 'inn':
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
