export default function CreateShip(length) {
    const ship = {};

    ship.length = length;
    ship.coord = [];
    ship.hitCount = 0;

    ship.hit = () => {
        ship.hitCount++;
    };

    ship.isSunk = () => {
        return ship.hitCount === ship.length ? true : false;
    };

    return ship;
}
