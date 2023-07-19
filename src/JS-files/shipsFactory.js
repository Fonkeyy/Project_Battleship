export default function Ship([x1, y1], [x2, y2]) {
    let ship = {};

    ship.coord = [];
    ship.hitCount = 0;

    ship.placeShip = (gameBoard) => {
        if (x2 <= 9 && x2 >= 0 && y2 <= 9 && y2 >= 0) {
            let isValidPlacement = true;

            // * Check if the ship is placed vertically or horizontally depending if same X or Y
            if (y1 === y2) {
                for (let i = 0; i < ship.length; i++) {
                    // * If cell is occupied
                    if (gameBoard.isCellOccupied([x1 + i, y1])) {
                        isValidPlacement = false;
                        ship = null;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < ship.length; i++) {
                        // * Define it as occupied
                        gameBoard.board[y1][x1 + i] = 1;
                        // * Add coords to ship object
                        ship.coord.push([x1 + i, y1]);
                    }
                }
            }
            if (x1 === x2) {
                for (let i = 0; i < ship.length; i++) {
                    if (gameBoard.isCellOccupied([x1, y1 + i])) {
                        isValidPlacement = false;
                        ship = null;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < ship.length; i++) {
                        gameBoard.board[y1 + i][x1] = 1;
                        ship.coord.push([x1, y1 + i]);
                    }
                }
            }

            if (isValidPlacement) {
                // * add ship object to gameBoard shipList
                gameBoard.shipsList.push(ship);
                return ship;
            } else if (gameBoard.id !== 'computer' && !gameBoard.isRandomlyPlaced) {
                alert('Cell is already occupied');
            }
        } else if (gameBoard.id !== 'computer' && !gameBoard.isRandomlyPlaced) {
            alert('Ship must be placed within the grid');
        }
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
        return ship.hitCount === ship.length ? true : false;
    };

    ship.length = ship.calculateLength([x1, y1], [x2, y2]);

    return ship;
}
