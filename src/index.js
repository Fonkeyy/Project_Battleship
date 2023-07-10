import './CSS-files/global.css';
import './CSS-files/home.css';
import './CSS-files/board.css';
import './CSS-files/ships.css';
import './CSS-files/sidebar.css';
// import { setUpInterface, gameLoop } from './JS-files/gameLoop';

import { setUpInterface } from './JS-files/gameLoop';
import { CreateGameBoard } from './JS-files/gameboardFactory';
import { create$Board, homeAnimation } from './JS-files/interfaceController';
import { create$Ship } from './JS-files/dragAndDrop2';

// * Select DOM btn and store it in variable
const StartGameBtn = document.querySelector('#start-game-btn');

// * Add event listener with handlers function.
StartGameBtn.addEventListener('click', () => {
    handleStartGameBtn();
});

const handleStartGameBtn = () => {
    if (StartGameBtn.dataset.gameStarted === 'true') {
        handleRestartGame();
    } else {
        // * Store players name input and add it to the DOM
        const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
        const inputPlayer2 = document.querySelector('#input-player-2').value || 'Player 2';

        const player1Name = document.querySelector('#player1-name');
        const player2Name = document.querySelector('#player2-name');

        player1Name.textContent = `Player 1 : ${inputPlayer1}`;
        player2Name.textContent = `Player 2 : ${inputPlayer2}`;

        // * Create GameBoard objects with players name as parameters
        const gameBoardPlayer1 = CreateGameBoard(inputPlayer1, inputPlayer2);
        const gameBoardPlayer2 = CreateGameBoard(inputPlayer2, inputPlayer1);

        // * Create $Boards with GameBoard objects as parameters
        const $boardPlayer1 = create$Board(gameBoardPlayer1);
        const $boardPlayer2 = create$Board(gameBoardPlayer2);

        // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
        homeAnimation();
        setUpInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
        StartGameBtn.value = 'Restart';
        StartGameBtn.dataset.gameStarted = 'true';
        create$Ship();
    }
};

const handleRestartGame = () => {
    // * Select DOM elements
    const $boards = document.querySelectorAll('.board');
    const $names = document.querySelectorAll('.name');
    const $shipItems = document.querySelectorAll('.ship-item');

    // * Clear DOM
    $boards.forEach((board) => {
        board.remove();
    });

    $names.forEach((name) => {
        name.remove();
    });

    $shipItems.forEach((ship) => {
        ship.remove();
    });

    StartGameBtn.value = 'Start';
    StartGameBtn.dataset.gameStarted = 'false';
};
