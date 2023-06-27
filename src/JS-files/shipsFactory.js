export default function CreateShip(length) {
    const ship = {};

    ship.length = length;
    ship.coord = [];
    ship.hitCount = 0;

    ship.hit = function () {
        ship.hitCount++;
    };

    ship.isSunk = function () {
        return ship.hitCount === ship.length ? true : false;
    };

    return ship;
}
