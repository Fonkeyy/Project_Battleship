import './CSS-files/global.css';
import './CSS-files/board.css';
// import { setUpInterface, gameLoop } from './JS-files/gameLoop';
// import CreateGameBoard from './JS-files/gameboardFactory';
// import { create$Board } from './JS-files/interfaceController';

import { setUpInterface } from './JS-files/gameLoop';
import { CreateGameBoard } from './JS-files/gameboardFactory';
import { create$Board } from './JS-files/interfaceController';
import { create$Ship } from './JS-files/dragAndDrop';

// * Select DOM btns and store it in variables
const openStartDialogBtn = document.querySelector('#open-start-dialog-btn'),
    closeStartDialogBtn = document.querySelector('#start-dialog-close-dialog-btn'),
    startDialog = document.querySelector('#start-dialog'),
    startDialogStartGameBtn = document.querySelector('#start-dialog-start-game-btn');

// * Add event listener with handlers function for each btns
openStartDialogBtn.addEventListener('click', () => {
    handleOpenStartDialogBtn();
});
closeStartDialogBtn.addEventListener('click', () => {
    handleCloseStartDialogBtn();
});
startDialogStartGameBtn.addEventListener('click', () => {
    handleStartDialogStartGameBtn();
});

const handleOpenStartDialogBtn = () => {
    // * If game started => restart game
    if (startDialogStartGameBtn.dataset.gameStarted === 'true') {
        handleRestartGame();
        // * Else => show dialog
    } else {
        if (!startDialog.open) {
            startDialog.showModal();
        }
    }
};

const handleCloseStartDialogBtn = () => {
    startDialog.close();
};

const handleStartDialogStartGameBtn = () => {
    // * Store players name input and add it to the DOM
    const inputPlayer1 = document.querySelector('#input-player-1').value;
    const inputPlayer2 = document.querySelector('#input-player-2').value;

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
    setUpInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
    startDialog.close();
    openStartDialogBtn.value = 'Restart';
    startDialogStartGameBtn.dataset.gameStarted = 'true';
};

const handleRestartGame = () => {
    // * Select all $boards
    const $boards = document.querySelectorAll('.board');

    // * Remove each $board, change start btn value to 'Let's Go' and set its dataset.gameStarted to false
    $boards.forEach((board) => {
        board.remove();
        openStartDialogBtn.value = "Let's Go";
        startDialogStartGameBtn.dataset.gameStarted = 'false';
    });
};

// * Add drag n drop mousedown event listeners on ship items
const shipItems = document.querySelectorAll('.ship-item');
shipItems.forEach((item) => item.addEventListener('mousedown', (e) => create$Ship(e)));
