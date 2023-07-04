import Player from './player';
import CreateShip from './shipsFactory';

export default function CreateGameBoard(opponent) {
    const gameBoard = {};
    gameBoard.opponent = new Player(opponent);

    gameBoard.createBoard = () => {
        let board = [];

        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10).fill(false);
        }
        return board;
    };

    gameBoard.createMatrix = () => {
        let matrix = [];

        for (let i = 0; i < 10; i++) {
            matrix[i] = new Array(10).fill(false);
        }
        return matrix;
    };

    gameBoard.shipLength = ([x1, y1], [x2, y2]) => {
        let length = 0;
        if (x1 == x2) {
            length = y2 - y1 + 1;
        } else {
            length = x2 - x1 + 1;
        }
        return length;
    };

    gameBoard.board = gameBoard.createBoard();
    gameBoard.matrix = gameBoard.createMatrix();
    gameBoard.shipsList = [];
    gameBoard.sunkList = [];

    gameBoard.placeShip = ([x1, y1], [x2, y2]) => {
        const length = gameBoard.shipLength([x1, y1], [x2, y2]);
        const ship = CreateShip(length);

        if (y1 == y2) {
            gameBoard.board[y1 - 1][x1 - 1] = 1;
            for (let i = 0; i < length; i++) {
                gameBoard.board[y1 - 1][x1 - 1 + i] = 1;
                ship.coord.push([x1 - 1 + i, y1 - 1]);
            }
        } else {
            gameBoard.board[y1 - 1][x1 - 1] = 1;
            for (let i = 0; i < length; i++) {
                gameBoard.board[y1 - 1 + i][x1 - 1] = 1;
                ship.coord.push([x1 - 1, y1 - 1 + i]);
            }
        }
        gameBoard.shipsList.push(ship);
    };

    gameBoard.isOccupied = ([x1, y1]) => {
        if (gameBoard.board[y1 - 1][x1 - 1] >= 1) return true;
    };

    gameBoard.receiveAttack = ([x, y]) => {
        if (gameBoard.board[y - 1][x - 1] === 1) {
            const ship = gameBoard.shipsList.find((ship) => {
                return ship.coord.some(([coordX, coordY]) => coordX === x - 1 && coordY === y - 1);
            });
            ship.hit();
            gameBoard.board[y - 1][x - 1] = 2;
            gameBoard.opponent.hitList.push([x, y]);
            // console.log(gameBoard.opponent.hitList);

            if (ship.isSunk()) {
                gameBoard.sunkList.push(ship);

                ship.coord.forEach((coord) => {
                    const [y, x] = coord;
                    gameBoard.board[x][y] = 3;
                });
            }
        } else {
            if (!gameBoard.matrix[y - 1][x - 1] && !gameBoard.board[y - 1][x - 1] >= 1) {
                gameBoard.matrix[y - 1][x - 1] = true;
            }
        }
    };

    gameBoard.checkWinner = () => {
        return gameBoard.shipsList.length === gameBoard.sunkList.length ? true : false;
    };

    return gameBoard;
}
