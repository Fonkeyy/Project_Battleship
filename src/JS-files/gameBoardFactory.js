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
        const board = [];

        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10).fill(false);
        }
        return board;
    };

    // * Function matrix to keep track of player missed shots
    gameBoard.createMatrix = () => {
        const matrix = [];

        for (let i = 0; i < 10; i++) {
            matrix[i] = new Array(10).fill(false);
        }
        return matrix;
    };
    // * Create matrices and store it in variables
    gameBoard.board = gameBoard.createBoard();
    gameBoard.matrix = gameBoard.createMatrix();

    gameBoard.isCellOccupied = ([x1, y1]) => {
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
            let newShip = new Ship([x1, y1], [x1 + ship.length - 1, y1]);
            placedShip = newShip.placeShip(gameBoard);
        } else if (randomInt === 2) {
            let newShip = new Ship([x1, y1], [x1, y1 + ship.length - 1]);
            placedShip = newShip.placeShip(gameBoard);
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
