const prompt = require('prompt-sync')();
let gameRunning = true;

while (gameRunning) {
    const validateInput = input => {
        if (input.toLowerCase() === 'quit game' || input.toLowerCase() === 'quit')
            gameRunning = false;
    }
    let userInput = '';

    console.log('You are a pirate captain sailing the high seas with your crew in search of plunder and glory.');
    console.log('At any time throughout the game, you can say "quit game" to exit.\n');
    
    userInput = validateInput(prompt('What is the name of your ship? '));

}
