import Player from './JS-files/player';

import './CSS-files/global.css';
import './CSS-files/board.css';
import { setUpInterface, gameLoop } from './JS-files/gameLoop';
import CreateGameBoard from './JS-files/gameboardFactory';
import { create$Board } from './JS-files/interfaceController';
// import CreateShip from './JS-files/shipsFactory';

const human = Player('human');

const computer = Player('computer');

const playerGameBoard = CreateGameBoard();
const $playerBoard = create$Board(playerGameBoard.board);

const computerGameBoard = CreateGameBoard();
const $computerBoard = create$Board(computerGameBoard.board);

setUpInterface(playerGameBoard, computerGameBoard, $playerBoard, $computerBoard);

gameLoop(human, computer, playerGameBoard, computerGameBoard, $playerBoard, $computerBoard);

// const ship1 = CreateShip(2);
// console.log(ship1.length);

// ship1.hit();
// ship1.hit();
// console.log(ship1.hitCount);
// console.log(ship1.isSunk());

// playerGameBoard.placeShip([1, 1], [1, 5]);
// console.log(playerGameBoard.isOccupied([1, 1]));

// console.log(playerGameBoard.board[1 - 1][1 - 1]);

// playerGameBoard.receiveAttack([1, 1]);

// console.log(playerGameBoard.board[1 - 1][1 - 1]);
