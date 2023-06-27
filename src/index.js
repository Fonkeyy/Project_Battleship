import createGameBoard from './JS-files/gameboardFactory';
import Player from './JS-files/player';

const computer = Player('Computer');

const computerGameBoard = createGameBoard();
computerGameBoard.placeShip([1, 1], [1, 5]);
computerGameBoard.placeShip([3, 4], [7, 4]);

const playerGameBoard = createGameBoard();
playerGameBoard.placeShip([1, 1], [1, 5]);
playerGameBoard.placeShip([3, 4], [7, 4]);
