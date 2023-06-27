/* eslint-disable no-undef */

import createShip from '../JS-files/shipsFactory';

const ship1 = createShip(2);

describe('ships.js', () => {
    test('ship hit', () => {
        ship1.hit();
        ship1.hit();
        expect(ship1.hitCount).toBe(2);
    });

    test('ship isSunk', () => {
        expect(ship1.isSunk()).toBe(true);
    });
});