import './CSS-files/global.css';
import './CSS-files/board.css';
// import { setUpInterface, gameLoop } from './JS-files/gameLoop';
// import CreateGameBoard from './JS-files/gameboardFactory';
// import { create$Board } from './JS-files/interfaceController';

import { setUpInterface } from './JS-files/gameLoop';
import CreateGameBoard from './JS-files/gameboardFactory';
import { create$Board } from './JS-files/interfaceController';

const openStartDialogBtn = document.querySelector('#open-start-dialog-btn'),
    closeStartDialogBtn = document.querySelector('#start-dialog-close-dialog-btn'),
    startDialog = document.querySelector('#start-dialog'),
    startDialogStartGameBtn = document.querySelector('#start-dialog-start-game-btn');

openStartDialogBtn.addEventListener('click', () => {
    if (startDialogStartGameBtn.dataset.gameStarted == 'true') {
        handleRestartGame();
    } else {
        handleOpenStartDialogBtn();
    }
});
closeStartDialogBtn.addEventListener('click', () => {
    handleCloseStartDialogBtn();
});

startDialogStartGameBtn.addEventListener('click', () => {
    handleStartDialogStartGameBtn();
});

const handleOpenStartDialogBtn = () => {
    if (!startDialog.open) {
        startDialog.showModal();
    }
};
const handleCloseStartDialogBtn = () => {
    startDialog.close();
};

const handleStartDialogStartGameBtn = () => {
    const inputPlayer1 = document.querySelector('#input-player-1').value;
    const inputPlayer2 = document.querySelector('#input-player-2').value;

    const gameBoardPlayer1 = CreateGameBoard(inputPlayer2);
    const gameBoardPlayer2 = CreateGameBoard(inputPlayer1);

    const $boardPlayer1 = create$Board(gameBoardPlayer1.board);
    const $boardPlayer2 = create$Board(gameBoardPlayer2.board);

    setUpInterface(gameBoardPlayer1, gameBoardPlayer2, $boardPlayer1, $boardPlayer2);
    startDialog.close();
    openStartDialogBtn.value = 'Restart';
    startDialogStartGameBtn.dataset.gameStarted = 'true';
};

const handleRestartGame = () => {
    // todo => Implement restart function
};
