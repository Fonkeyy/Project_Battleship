import CreateGameBoard from './gameboardFactory';
import { create$Board, updateGrid } from './interfaceController';

const playerGameBoard = CreateGameBoard();
const $playerBoard = create$Board(playerGameBoard.board);

const computerGameBoard = CreateGameBoard();
const $computerBoard = create$Board(computerGameBoard.board);

export function setUpInterface() {
    playerGameBoard.placeShip([1, 1], [1, 5]);
    playerGameBoard.placeShip([3, 4], [7, 4]);
    playerGameBoard.placeShip([10, 9], [10, 10]);

    computerGameBoard.placeShip([1, 1], [1, 2]);

    const main = document.createElement('main');
    document.body.appendChild(main);

    main.appendChild($computerBoard);
    main.appendChild($playerBoard);

    updateGrid(playerGameBoard.board, playerGameBoard.matrix, $playerBoard);
    updateGrid(computerGameBoard, computerGameBoard.matrix, $computerBoard);
}

export function gameLoop(player1, player2) {
    let turnCount = 0;

    if (turnCount === 0) {
        setUpInterface();
    } else {
        if (player1.active) {
            // playTurn(player1, player2);
        } else if (player2.active) {
            // playTurn(player2, player1);
        } else {
            player1.active = true;
            player2.active = true;
        }
        turnCount++;
    }
    // todo => create playTurn function
    // todo =>
    // todo =>
}

// function playTurn(player, ennemy) {
//     const ennemyCells = $computerBoard.querySelectorAll('.cell');
//     $computerBoard;
// }
