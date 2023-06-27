import CreateGameBoard from './gameboardFactory';
import { clickCellHandler, create$Board, updateGrid } from './interfaceController';

export { playerGameBoard, $playerBoard, computerGameBoard, $computerBoard };

const playerGameBoard = CreateGameBoard();
const $playerBoard = create$Board(playerGameBoard.board);

const computerGameBoard = CreateGameBoard();
const $computerBoard = create$Board(computerGameBoard.board);

export function setUpInterface() {
    playerGameBoard.placeShip([1, 1], [1, 5]);
    playerGameBoard.placeShip([3, 4], [7, 4]);
    playerGameBoard.placeShip([10, 9], [10, 10]);

    computerGameBoard.placeShip([1, 1], [1, 2]);
    computerGameBoard.placeShip([8, 6], [8, 10]);
    computerGameBoard.placeShip([2, 4], [6, 4]);

    const main = document.createElement('main');
    document.body.appendChild(main);

    main.appendChild($computerBoard);
    main.appendChild($playerBoard);

    updateGrid(playerGameBoard.board, computerGameBoard.matrix, $playerBoard);
}

// todo => finish gameLoop and make it works
export function gameLoop(player1, player2, boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2) {
    console.log($boardPlayer2);
    // ! <= $boardPlayer2 is undefined => parameters missing in index.js
    if (player1.active) {
        toggleEventListener($boardPlayer2, clickCellHandler);
        updateGrid(boardPlayer1.board, boardPlayer2.matrix, $boardPlayer1);
        boardPlayer1.checkWinner();
    } else if (player2.active) {
        toggleEventListener($boardPlayer1, clickCellHandler);

        updateGrid(boardPlayer2.board, boardPlayer2.matrix, $boardPlayer2);
    } else {
        player1.active = true;
        player2.active = true;
    }

    gameLoop(player1, player2, boardPlayer1, boardPlayer2, $boardPlayer1, $boardPlayer2);
}

// todo => check if this function works as expected
function toggleEventListener(element, functionName) {
    console.log(element);
    if (element.hasEventListener) {
        element.removeEventListener('click', functionName);
        element.hasEventListener = false;
    } else {
        element.addEventListener('click', functionName);
        element.hasEventListener = true;
    }
}
