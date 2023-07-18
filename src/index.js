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
import { GameBoard } from './JS-files/gameboardFactory';

// * Select DOM btns and store it in variables
// // const StartGameBtn = document.querySelector('#start-game-btn');
const StartComputerBtn = document.querySelector('#start-computer-btn');

// * Add events listener with handlers function.

// // StartGameBtn.addEventListener('click', () => {
// //     handleStartGameBtn();
// // });

StartComputerBtn.addEventListener('click', () => {
    handleStartComputerBtn();
});

// // const handleStartGameBtn = () => {
// //     if (StartGameBtn.dataset.gameStarted === 'true') {
// //         handleRestartGame();
// //     } else {
// //         const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
// //         const inputPlayer2 = document.querySelector('#input-player-2').value || 'Player 2';

// //         // * Create GameBoard objects with players name as parameters
// //         const gameBoardPlayer1 = GameBoard(inputPlayer1, inputPlayer2);
// //         const gameBoardPlayer2 = GameBoard(inputPlayer2, inputPlayer1);

// //         // * Create $Boards with GameBoard objects as parameters
// //         const $boardPlayer1 = renderBoard(gameBoardPlayer1);
// //         const $boardPlayer2 = renderBoard(gameBoardPlayer2);

// //         // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
// //         homeAnimation();
// //         renderInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
// //         displayShipsList();
// //         addDragAndDropEventsListener(gameBoardPlayer1);
// //         StartGameBtn.value = 'Restart';
// //         StartGameBtn.dataset.gameStarted = 'true';
// //     }
// // };

const handleStartComputerBtn = () => {
    const inputPlayer1 = document.querySelector('#input-player-1').value || 'Player 1';
    const inputPlayer2 = 'computer';

    // * Create GameBoard objects with players name as parameters
    const gameBoardPlayer1 = GameBoard(inputPlayer1, inputPlayer2);
    const computerBoard = GameBoard(inputPlayer2, inputPlayer1);

    // * Create $Boards with GameBoard objects as parameters
    const $boardPlayer1 = renderBoard(gameBoardPlayer1);
    const $boardComputer = renderBoard(computerBoard);

    // * Set up interface, close dialog, change start btn value and its dataset.gameStarted to true
    homeAnimation();
    renderInterface(gameBoardPlayer1, computerBoard, $boardPlayer1, $boardComputer);
    displayShipsList();
    addDragAndDropEventsListener(gameBoardPlayer1);

    computerBoard.randomPlaceFleet();
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
};

export { handleRestartGame };
