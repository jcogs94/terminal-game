const prompt = require('prompt-sync')();
let gameRunning = true;

while (gameRunning) {
    let userInput = '';

    userInput = prompt('Test: ');

    if (userInput.toLowerCase() === 'quit game')
        gameRunning = false;
}
