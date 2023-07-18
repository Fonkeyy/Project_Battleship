import { getRandomCoords, getRandomInteger, shipsData } from './helpers';
import { Computer, Player } from './player';
import Ship from './shipsFactory';

// * Initialize gameBoardList to keep track of different gameBoard
const gameBoardList = [];

const GameBoard = (playerName, opponentName) => {
    // * Initialize gameBoard Object and add it ID
    const gameBoard = {};
    gameBoard.id = playerName;

    // * If against computer create computer player else create human player
    gameBoard.opponentName = opponentName === 'computer' ? new Computer() : new Player(opponentName);

    // * Initialize shipList to keep track of different ships
    gameBoard.shipsList = [];
    // * Initialize sunkList to keep track of different sunk ships
    gameBoard.sunkList = [];
    // * Initialize flag about random placement
    gameBoard.isRandomlyPlaced = false;

    // * Function matrix to keep track of player state game
    gameBoard.createBoard = () => {
        let board = [];

        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10).fill(false);
        }
        return board;
    };

    // * Function matrix to keep track of player missed shots
    gameBoard.createMatrix = () => {
        let matrix = [];

        for (let i = 0; i < 10; i++) {
            matrix[i] = new Array(10).fill(false);
        }
        return matrix;
    };

    // * Calculate shipLength from coordinates
    gameBoard.shipLength = ([x1, y1], [x2, y2]) => {
        let length = 0;
        if (x1 == x2) {
            length = y2 - y1 + 1;
        } else {
            length = x2 - x1 + 1;
        }
        return length;
    };

    // * Create matrices and store it in variables
    gameBoard.board = gameBoard.createBoard();
    gameBoard.matrix = gameBoard.createMatrix();

    // * Function to place ship on board
    gameBoard.placeShip = ([x1, y1], [x2, y2]) => {
        if (x2 <= 9 && x2 >= 0 && y2 <= 9 && y2 >= 0) {
            // * Get ship length
            const length = gameBoard.shipLength([x1, y1], [x2, y2]);

            // * Create ship
            let ship = Ship(length);

            let isValidPlacement = true;

            // * Check if the ship is placed vertically or horizontally depending if same X or Y
            if (y1 === y2) {
                for (let i = 0; i < length; i++) {
                    // * If cell is occupied
                    if (gameBoard.isOccupied([x1 + i, y1])) {
                        isValidPlacement = false;
                        ship = null;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < length; i++) {
                        // * Define it as occupied
                        gameBoard.board[y1][x1 + i] = 1;
                        // * Add coords to ship object
                        ship.coord.push([x1 + i, y1]);
                    }
                }
            }
            if (x1 === x2) {
                for (let i = 0; i < length; i++) {
                    if (gameBoard.isOccupied([x1, y1 + i])) {
                        isValidPlacement = false;
                        ship = null;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for (let i = 0; i < length; i++) {
                        gameBoard.board[y1 + i][x1] = 1;
                        ship.coord.push([x1, y1 + i]);
                    }
                }
            }

            if (isValidPlacement) {
                // * add ship object to shipList
                gameBoard.shipsList.push(ship);
                return ship;
            } else if (gameBoard.id !== 'computer' && !gameBoard.isRandomlyPlaced) {
                alert('Cell is already occupied');
            }
        } else if (gameBoard.id !== 'computer' && !gameBoard.isRandomlyPlaced) {
            alert('Ship must be placed within the grid');
        }
    };

    gameBoard.isOccupied = ([x1, y1]) => {
        return gameBoard.board[y1][x1] >= 1;
    };

    gameBoard.receiveAttack = ([x, y]) => {
        // * Check if a ship is present on coords
        if (gameBoard.board[y][x] === 1) {
            // * Find corresponding ship in shipList
            const ship = gameBoard.shipsList.find((ship) => {
                return ship.coord.some(([coordX, coordY]) => coordX === x && coordY === y);
            });
            // * Hit the ship, change matrix value to 'hit cell' and add coords to opponent hitList
            ship.hit();
            gameBoard.board[y][x] = 2;
            gameBoard.opponentName.hitList.push([x, y]);

            // * If ship is sunk add it to the sunkList and change matrix value to 'sunk cell'
            if (ship.isSunk()) {
                gameBoard.sunkList.push(ship);

                ship.coord.forEach((coord) => {
                    const [y, x] = coord;
                    gameBoard.board[x][y] = 3;
                });
            }
            // * If no ship present on coords, change matrix value to 'miss cell'
        } else {
            if (!gameBoard.matrix[y][x] && !gameBoard.board[y][x] >= 1) {
                gameBoard.matrix[y][x] = true;
                gameBoard.opponentName.moves.push([x, y]);
            }
        }
    };

    gameBoard.checkWinner = () => {
        return gameBoard.shipsList.length === gameBoard.sunkList.length;
    };

    gameBoard.reset = () => {
        gameBoard.board = gameBoard.createBoard();
        gameBoard.matrix = gameBoard.createMatrix();
    };

    gameBoard.randomPlaceShip = (ship) => {
        // * Get random coords and random between 1 and 2, initialize placedShip flag
        let [x1, y1] = getRandomCoords();
        let randomInt = getRandomInteger(2);
        let placedShip = false;

        // * Place ship vertically or horizontally randomly
        if (randomInt === 1) {
            placedShip = gameBoard.placeShip([x1, y1], [x1 + ship.length - 1, y1]);
        } else if (randomInt === 2) {
            placedShip = gameBoard.placeShip([x1, y1], [x1, y1 + ship.length - 1]);
        }
        // * If placeShip is not valid rerun the function
        if (!placedShip) {
            gameBoard.randomPlaceShip(ship);
        }
    };

    gameBoard.randomPlaceFleet = () => {
        gameBoard.isRandomlyPlaced = true;
        // * Get the data
        const ships = shipsData;

        // * For each ship in shipsData call randomPlaceShip function
        for (const ship of ships) {
            gameBoard.randomPlaceShip(ship);
        }
    };

    // * Push gameBoard to gameBoardList and return it
    gameBoardList.push(gameBoard);
    return gameBoard;
};

export { gameBoardList, GameBoard };
