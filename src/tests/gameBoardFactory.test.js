/* eslint-disable no-undef */

import { gameBoard } from '../JS-files/gameBoardFactory';
import Ship from '../JS-files/shipsFactory';

const gameBoard = gameBoard('player1', 'player2');
const ship = Ship([1, 1], [3, 1]);

describe('gameBoardFactory.js', () => {
    test('board length', () => {
        expect(gameBoard.board.length).toBe(10);
    });

    test('case is occupied', () => {
        ship.placeShip(gameBoard);
        expect(gameBoard.isCellOccupied([2, 1])).toBe(true);
    });

    test('receive attack', () => {
        gameBoard.receiveAttack([1, 1]);
        gameBoard.receiveAttack([2, 1]);
        gameBoard.receiveAttack([3, 1]);
        const ship = gameBoard.shipsList.find((ship) => {
            return ship.coord.some(([x, y]) => x === 1 && y === 1);
        });
        expect(ship.hitCount).toBe(3);
        expect(ship.isSunk()).toBe(true);
    });

    test('attack miss', () => {
        gameBoard.receiveAttack([4, 1]);
        expect(gameBoard.matrix[1][4]).toBe(true);
    });

    test('ship sunk', () => {
        const ship = gameBoard.shipsList.find((ship) => {
            return ship.coord.some(([x, y]) => x === 1 && y === 1);
        });
        expect(ship.isSunk()).toBe(true);
    });

    test('all ships sunk', () => {
        gameBoard.checkWinner();

        expect(gameBoard.checkWinner()).toBe(true);
    });
});
