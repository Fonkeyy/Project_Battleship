export default function Ship([x1, y1], [x2, y2]) {
    let ship = {};

    ship.coord = [];
    ship.hitCount = 0;

    ship.placeShip = (gameBoard) => {
        const isValidCoords = x2 <= 9 && x2 >= 0 && y2 <= 9 && y2 >= 0;
        const isComputerBoard = gameBoard.id !== 'computer';
        const isRandomlyPlaced = gameBoard.isRandomlyPlaced;

        if (isValidCoords) {
            const isVertical = y1 === y2;

            if (validateShipPlacement(gameBoard, isVertical)) {
                // * Add ship object to gameBoard shipList

                gameBoard.shipsList.push(ship);
                return ship;
            } else if (isComputerBoard && !isRandomlyPlaced) {
                alert('Cell is already occupied');
            }
        } else if (isComputerBoard && !isRandomlyPlaced) {
            alert('Ship must be placed within the grid');
        }
    };

    const validateShipPlacement = (gameBoard, isVertical) => {
        for (let i = 0; i < ship.length; i++) {
            const coords = isVertical ? [x1 + i, y1] : [x1, y1 + i];

            if (gameBoard.isCellOccupied(coords)) {
                return false;
            } else {
                // * Define it as occupied
                gameBoard.board[coords[1]][coords[0]] = 1;
                // * Add coords to ship object
                ship.coord.push(coords);
            }
        }
        return true;
    };

    // * Calculate shipLength from coordinates
    ship.calculateLength = ([x1, y1], [x2, y2]) => {
        let length = 0;
        if (x1 == x2) {
            length = y2 - y1 + 1;
        } else {
            length = x2 - x1 + 1;
        }
        return length;
    };

    ship.hit = () => {
        ship.hitCount++;
    };

    ship.isSunk = () => {
        return ship.hitCount === ship.length;
    };

    ship.length = ship.calculateLength([x1, y1], [x2, y2]);

    return ship;
}
