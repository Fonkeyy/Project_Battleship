/* eslint-disable no-undef */

import GameBoard from '../JS-files/gameboardFactory';

const gameBoard = GameBoard();

describe('gameBoard.js', () => {
    test.only('board length', () => {
        expect(gameBoard.board.length).toBe(10);
    });

    test.only('case is occupied', () => {
        gameBoard.placeShip([1, 1], [3, 1]);
        expect(gameBoard.isCellOccupied([2, 1])).toBe(true);
    });

    test.only('receive attack', () => {
        gameBoard.receiveAttack([1, 1]);
        gameBoard.receiveAttack([2, 1]);
        gameBoard.receiveAttack([3, 1]);
        const ship = gameBoard.shipsList.find((ship) => {
            return ship.coord.some(([x, y]) => x === 1 - 1 && y === 1 - 1);
        });
        expect(ship.hitCount).toBe(3);
        expect(ship.isSunk()).toBe(true);
    });

    test.only('attack miss', () => {
        gameBoard.receiveAttack([4, 1]);
        expect(gameBoard.matrix[1 - 1][4 - 1]).toBe(true);
    });

    test.only('ship sunk', () => {
        const ship = gameBoard.shipsList.find((ship) => {
            return ship.coord.some(([x, y]) => x === 1 - 1 && y === 1 - 1);
        });
        expect(ship.isSunk()).toBe(true);
    });

    test.only('all ships sunk', () => {
        gameBoard.checkWinner();

        expect(gameBoard.checkWinner()).toBe(true);
    });
});
