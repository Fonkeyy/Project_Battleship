import './CSS-files/global.css';
import './CSS-files/home.css';
import './CSS-files/main-content.css';

import {
    displayShipsList,
    renderInterface,
    renderBoard,
    homeAnimation,
    addDragAndDropEventsListener,
} from './JS-files/interfaceController';
import { CreateGameBoard } from './JS-files/gameboardFactory';

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
        const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
        const inputPlayer2 = document.querySelector('#input-player-2').value || 'Player 2';

        // * Create GameBoard objects with players name as parameters
        const gameBoardPlayer1 = CreateGameBoard(inputPlayer1, inputPlayer2);
        const gameBoardPlayer2 = CreateGameBoard(inputPlayer2, inputPlayer1);

        gameBoardPlayer2.placeShip([0, 0], [0, 3]);

        // * Create $Boards with GameBoard objects as parameters
        const $boardPlayer1 = renderBoard(gameBoardPlayer1);
        const $boardPlayer2 = renderBoard(gameBoardPlayer2);

        // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
        homeAnimation();
        renderInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
        displayShipsList();
        addDragAndDropEventsListener(gameBoardPlayer1);
        StartGameBtn.value = 'Restart';
        StartGameBtn.dataset.gameStarted = 'true';
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
